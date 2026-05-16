import type { Locale } from '../types/site'

const API_BASE = '/api/serpapi'

type ProxyErrorResponse = {
  code?: string
  error?: string
}

export class LookupProxyError extends Error {
  code?: string
  status?: number

  constructor(message: string, options?: { code?: string; status?: number }) {
    super(message)
    this.name = 'LookupProxyError'
    this.code = options?.code
    this.status = options?.status
  }
}

type AutocompleteResponse = ProxyErrorResponse & {
  suggestions?: Array<{
    dataId?: string
    location?: {
      lat: number
      lng: number
    }
    primary: string
    secondary: string
    text: string
  }>
}

type DirectionsResponse = ProxyErrorResponse & {
  distance?: number
}

type SelectedAddress = {
  dataId?: string
  location?: {
    lat: number
    lng: number
  }
}

export type AddressSuggestion = {
  dataId?: string
  id: string
  location?: {
    lat: number
    lng: number
  }
  primary: string
  secondary: string
  text: string
}

type RouteDistanceQuery = {
  destination: string
  destinationSelection?: SelectedAddress
  locale: Locale
  origin: string
  originSelection?: SelectedAddress
  signal?: AbortSignal
}

async function fetchProxy<T extends ProxyErrorResponse>(
  path: 'autocomplete' | 'directions',
  params: Record<string, string | undefined>,
  signal?: AbortSignal,
) {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value)
    }
  }

  const response = await fetch(`${API_BASE}/${path}?${searchParams.toString()}`, {
    signal,
  })

  const data = (await response.json().catch(() => ({}))) as T

  if (!response.ok) {
    throw new LookupProxyError(
      data.error ?? `Lookup request failed with status ${response.status}.`,
      {
        code: data.code,
        status: response.status,
      },
    )
  }

  if (data.error) {
    throw new LookupProxyError(data.error, {
      code: data.code,
      status: response.status,
    })
  }

  return data
}

function serializeSelection(
  prefix: 'start' | 'end',
  selection: SelectedAddress | undefined,
) {
  return {
    [`${prefix}DataId`]: selection?.dataId,
    [`${prefix}Lat`]:
      typeof selection?.location?.lat === 'number'
        ? String(selection.location.lat)
        : undefined,
    [`${prefix}Lng`]:
      typeof selection?.location?.lng === 'number'
        ? String(selection.location.lng)
        : undefined,
  }
}

export const addressLookupAvailable = true

export function getLookupErrorKind(error: unknown) {
  if (
    error instanceof LookupProxyError &&
    (error.code === 'LOOKUP_MAINTENANCE' || error.status === 503)
  ) {
    return error.code === 'LOOKUP_NOT_CONFIGURED' ? 'unconfigured' : 'maintenance'
  }

  if (error instanceof LookupProxyError && error.code === 'LOOKUP_NOT_CONFIGURED') {
    return 'unconfigured'
  }

  if (
    error instanceof Error &&
    error.message.toLowerCase().includes('configured on the server')
  ) {
    return 'unconfigured'
  }

  return 'generic'
}

export async function fetchAddressSuggestions(
  query: string,
  locale: Locale,
  signal?: AbortSignal,
) {
  const normalizedQuery = query.trim()

  if (normalizedQuery.length < 3) {
    return []
  }

  const data = await fetchProxy<AutocompleteResponse>(
    'autocomplete',
    {
      locale,
      q: normalizedQuery,
    },
    signal,
  )

  const suggestions = Array.isArray(data.suggestions) ? data.suggestions : []

  return suggestions.map((suggestion, index): AddressSuggestion => ({
    dataId: suggestion.dataId,
    id: suggestion.dataId ?? `${suggestion.text}-${index}`,
    location: suggestion.location,
    primary: suggestion.primary,
    secondary: suggestion.secondary,
    text: suggestion.text,
  }))
}

export async function fetchRouteDistance({
  destination,
  destinationSelection,
  locale,
  origin,
  originSelection,
  signal,
}: RouteDistanceQuery) {
  const data = await fetchProxy<DirectionsResponse>(
    'directions',
    {
      destination: destination.trim(),
      locale,
      origin: origin.trim(),
      ...serializeSelection('start', originSelection),
      ...serializeSelection('end', destinationSelection),
    },
    signal,
  )

  if (typeof data.distance !== 'number' || !Number.isFinite(data.distance)) {
    throw new Error('No route distance returned.')
  }

  return data.distance
}
