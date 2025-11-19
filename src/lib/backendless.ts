// src/lib/backendless.ts
export const BACKENDLESS_APP_ID = process.env.BACKENDLESS_APP_ID!;
export const BACKENDLESS_REST_API_KEY = process.env.BACKENDLESS_REST_API_KEY!;
export const BACKENDLESS_BASE = process.env.BACKENDLESS_API_BASE ?? 'https://api.backendless.com';

if (!BACKENDLESS_APP_ID || !BACKENDLESS_REST_API_KEY) {
  // fail early during dev/build if env not set
  throw new Error('Missing Backendless environment variables. Set BACKENDLESS_APP_ID and BACKENDLESS_REST_API_KEY.');
}

/**
 * Generic fetch wrapper to Backendless Data API.
 * - tableName: name of the table/collection in Backendless (e.g. "Posts")
 * - query: optional query string (e.g. "where=...&pageSize=10")
 */
export async function backendlessFetch<T = any>(tableName: string, query = ''): Promise<T> {
  const url = `${BACKENDLESS_BASE}/${BACKENDLESS_APP_ID}/${BACKENDLESS_REST_API_KEY}/data/${tableName}${query ? `?${query}` : ''}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // server-side fetch; keys are on server only
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backendless request failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}