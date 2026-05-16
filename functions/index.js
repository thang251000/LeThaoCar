import { defineSecret } from 'firebase-functions/params'
import { onRequest } from 'firebase-functions/v2/https'

const serpApiKey = defineSecret('SERPAPI_API_KEY')
const defaultMapView = '@10.7769,106.7009,11z'

function createJsonResponse(res, statusCode, payload) {
  res.status(statusCode).set('Content-Type', 'application/json; charset=utf-8').send(payload)
}

function isLookupMaintenanceError(statusCode, errorMessage) {
  const normalizedMessage = typeof errorMessage === 'string' ? errorMessage.toLowerCase() : ''

  return (
    statusCode === 429 ||
    normalizedMessage.includes('quota') ||
    normalizedMessage.includes('rate limit') ||
    normalizedMessage.includes('monthly search limit') ||
    normalizedMessage.includes('run out of searches') ||
    normalizedMessage.includes('free searches') ||
    normalizedMessage.includes('insufficient credits') ||
    normalizedMessage.includes('credits left') ||
    normalizedMessage.includes('searches left')
  )
}

function buildAutocompletePayload(suggestions) {
  return suggestions
    .filter((suggestion) => Boolean(suggestion.value))
    .sort((left, right) => Number(right.type === 'place') - Number(left.type === 'place'))
    .slice(0, 5)
    .map((suggestion) => ({
      dataId: suggestion.data_id,
      location:
        typeof suggestion.latitude === 'number' &&
        typeof suggestion.longitude === 'number'
          ? {
              lat: suggestion.latitude,
              lng: suggestion.longitude,
            }
          : undefined,
      primary: suggestion.value ?? '',
      secondary: suggestion.subtext ?? '',
      text:
        suggestion.subtext && suggestion.value && !suggestion.value.includes(suggestion.subtext)
          ? `${suggestion.value}, ${suggestion.subtext}`
          : suggestion.value ?? '',
    }))
}

export const serpApiProxy = onRequest(
  {
    cors: true,
    region: 'asia-southeast1',
    secrets: [serpApiKey],
  },
  async (req, res) => {
    if (req.method !== 'GET') {
      createJsonResponse(res, 405, { error: 'Method not allowed.' })
      return
    }

    const apiKey = serpApiKey.value()

    if (!apiKey) {
      createJsonResponse(res, 503, {
        code: 'LOOKUP_NOT_CONFIGURED',
        error: 'Address lookup is not configured on the server.',
      })
      return
    }

    const locale = req.query.locale === 'vi' ? 'vi' : 'en'
    const path = req.path ?? req.url ?? ''

    let upstreamParams = {}

    if (path.endsWith('/autocomplete')) {
      const query = typeof req.query.q === 'string' ? req.query.q.trim() : ''

      if (query.length < 3) {
        createJsonResponse(res, 200, { suggestions: [] })
        return
      }

      upstreamParams = {
        api_key: apiKey,
        engine: 'google_maps_autocomplete',
        gl: 'vn',
        hl: locale,
        ll: defaultMapView,
        output: 'json',
        q: query,
      }
    } else if (path.endsWith('/directions')) {
      const origin = typeof req.query.origin === 'string' ? req.query.origin.trim() : ''
      const destination =
        typeof req.query.destination === 'string' ? req.query.destination.trim() : ''

      if (!origin || !destination) {
        createJsonResponse(res, 400, {
          error: 'Origin and destination are required.',
        })
        return
      }

      const startDataId =
        typeof req.query.startDataId === 'string' ? req.query.startDataId.trim() : ''
      const endDataId =
        typeof req.query.endDataId === 'string' ? req.query.endDataId.trim() : ''
      const startLat =
        typeof req.query.startLat === 'string' ? req.query.startLat.trim() : ''
      const startLng =
        typeof req.query.startLng === 'string' ? req.query.startLng.trim() : ''
      const endLat = typeof req.query.endLat === 'string' ? req.query.endLat.trim() : ''
      const endLng = typeof req.query.endLng === 'string' ? req.query.endLng.trim() : ''

      upstreamParams = {
        api_key: apiKey,
        distance_unit: '0',
        engine: 'google_maps_directions',
        gl: 'vn',
        hl: locale,
        output: 'json',
        travel_mode: '0',
        start_addr: startDataId || (startLat && startLng) ? undefined : origin,
        end_addr: endDataId || (endLat && endLng) ? undefined : destination,
        start_data_id: startDataId || undefined,
        end_data_id: endDataId || undefined,
        start_coords: startLat && startLng ? `${startLat},${startLng}` : undefined,
        end_coords: endLat && endLng ? `${endLat},${endLng}` : undefined,
      }
    } else {
      createJsonResponse(res, 404, { error: 'Lookup endpoint not found.' })
      return
    }

    const searchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(upstreamParams)) {
      if (value) {
        searchParams.set(key, value)
      }
    }

    try {
      const upstreamResponse = await fetch(
        `https://serpapi.com/search.json?${searchParams.toString()}`,
      )
      const payload = await upstreamResponse.json()

      if (!upstreamResponse.ok || payload.error) {
        const upstreamError =
          typeof payload.error === 'string' ? payload.error : 'Upstream lookup failed.'

        if (isLookupMaintenanceError(upstreamResponse.status, upstreamError)) {
          createJsonResponse(res, 503, {
            code: 'LOOKUP_MAINTENANCE',
            error: 'Lookup service is temporarily under maintenance.',
          })
          return
        }

        createJsonResponse(res, upstreamResponse.status || 502, {
          error: upstreamError,
        })
        return
      }

      if (path.endsWith('/autocomplete')) {
        createJsonResponse(res, 200, {
          suggestions: buildAutocompletePayload(
            Array.isArray(payload.suggestions) ? payload.suggestions : [],
          ),
        })
        return
      }

      const distance = Array.isArray(payload.directions)
        ? payload.directions.find(
            (direction) =>
              typeof direction.distance === 'number' &&
              Number.isFinite(direction.distance),
          )?.distance
        : undefined

      if (typeof distance !== 'number') {
        createJsonResponse(res, 502, {
          error: 'No route distance returned.',
        })
        return
      }

      createJsonResponse(res, 200, { distance })
    } catch (error) {
      createJsonResponse(res, 502, {
        error: error instanceof Error ? error.message : 'Lookup request failed.',
      })
    }
  },
)
