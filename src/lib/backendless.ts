export const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID || ''
export const BACKENDLESS_REST_API_KEY = process.env.BACKENDLESS_REST_API_KEY || ''
export const BACKENDLESS_BASE = process.env.BACKENDLESS_API_BASE || 'https://api.backendless.com'

export function hasServerCredentials(): boolean {
  return Boolean(BACKENDLESS_APP_ID && BACKENDLESS_REST_API_KEY)
}

export async function backendlessFetch<T = any>(tableName: string, query = ''): Promise<T | null> {
  if (!hasServerCredentials()) {
    console.warn('backendlessFetch: missing BACKENDLESS_APP_ID / BACKENDLESS_REST_API_KEY. Returning null.')
    return null
  }

  const url = `${BACKENDLESS_BASE}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_API_KEY}/data/${tableName}${query ? `?${query}` : ''}`

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Backendless request failed: ${res.status} ${text}`)
  }

  return (await res.json()) as T
}