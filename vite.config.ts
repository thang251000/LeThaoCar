import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

const defaultMapView = '@10.7769,106.7009,11z'

function getSerpApiKey(env: Record<string, string>) {
  return env.SERPAPI_API_KEY?.trim() || env.VITE_SERPAPI_API_KEY?.trim() || ''
}

function createJsonResponse(
  res: import('node:http').ServerResponse,
  statusCode: number,
  payload: unknown,
) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

async function proxySerpApiRequest(
  req: import('node:http').IncomingMessage,
  res: import('node:http').ServerResponse,
  apiKey: string,
) {
  if (req.method !== 'GET') {
    createJsonResponse(res, 405, { error: 'Method not allowed.' })
    return
  }

  const requestUrl = new URL(req.url ?? '/', 'http://localhost')
  const pathname = requestUrl.pathname
  const locale = requestUrl.searchParams.get('locale') === 'vi' ? 'vi' : 'en'

  if (!apiKey) {
    createJsonResponse(res, 503, {
      error: 'Address lookup is not configured on the server.',
    })
    return
  }

  let upstreamParams: Record<string, string | undefined>

  if (pathname.endsWith('/autocomplete')) {
    const query = requestUrl.searchParams.get('q')?.trim() ?? ''

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
  } else if (pathname.endsWith('/directions')) {
    const origin = requestUrl.searchParams.get('origin')?.trim() ?? ''
    const destination = requestUrl.searchParams.get('destination')?.trim() ?? ''

    if (!origin || !destination) {
      createJsonResponse(res, 400, {
        error: 'Origin and destination are required.',
      })
      return
    }

    const startDataId = requestUrl.searchParams.get('startDataId')?.trim() ?? ''
    const endDataId = requestUrl.searchParams.get('endDataId')?.trim() ?? ''
    const startLat = requestUrl.searchParams.get('startLat')?.trim() ?? ''
    const startLng = requestUrl.searchParams.get('startLng')?.trim() ?? ''
    const endLat = requestUrl.searchParams.get('endLat')?.trim() ?? ''
    const endLng = requestUrl.searchParams.get('endLng')?.trim() ?? ''

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
    const payload = (await upstreamResponse.json()) as {
      directions?: Array<{ distance?: number }>
      error?: string
      suggestions?: Array<{
        data_id?: string
        latitude?: number
        longitude?: number
        subtext?: string
        type?: string
        value?: string
      }>
    }

    if (!upstreamResponse.ok || payload.error) {
      createJsonResponse(res, upstreamResponse.status || 502, {
        error: payload.error ?? 'Upstream lookup failed.',
      })
      return
    }

    if (pathname.endsWith('/autocomplete')) {
      const suggestions = Array.isArray(payload.suggestions) ? payload.suggestions : []
      const normalizedSuggestions = suggestions
        .filter((suggestion) => Boolean(suggestion.value))
        .sort(
          (left, right) => Number(right.type === 'place') - Number(left.type === 'place'),
        )
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

      createJsonResponse(res, 200, {
        suggestions: normalizedSuggestions,
      })
      return
    }

    const distance = payload.directions?.find(
      (direction) =>
        typeof direction.distance === 'number' && Number.isFinite(direction.distance),
    )?.distance

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
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const serpApiKey = getSerpApiKey(env)

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serpapi-dev-proxy',
        configureServer(server) {
          server.middlewares.use('/api/serpapi', (req, res, next) => {
            if (!req.url) {
              next()
              return
            }

            void proxySerpApiRequest(req, res, serpApiKey)
          })
        },
      },
    ],
    build: {
      cssCodeSplit: true,
    },
  }
})
