type AnyObj = Record<string, any>

let _Backendless: AnyObj | null = null

export function isBackendlessInited(): boolean {
  return Boolean(_Backendless && _Backendless._inited)
}

export async function initBackendlessClient(): Promise<void> {
  // only run on client
  if (typeof window === 'undefined') return

  if (isBackendlessInited()) return

  const appId = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID
  const jsKey = process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY

  if (!appId || !jsKey) {
    // Keep behavior predictable: throw so callers can show friendly message.
    throw new Error('Missing NEXT_PUBLIC_BACKENDLESS_APP_ID or NEXT_PUBLIC_BACKENDLESS_JS_KEY')
  }

  // dynamic import to avoid TypeScript compile-time type checks about initApp
  const mod = await import('backendless')
  const BackendlessLib = (mod as any).default ?? mod

  // cast to any to avoid TS complaining about initApp not in type defs
  ;(BackendlessLib as any).initApp(appId, jsKey)
  ;(BackendlessLib as any)._inited = true

  // store reference
  _Backendless = BackendlessLib as AnyObj

  // attach to window for easier debugging (optional)
  try {
    ;(window as any).__Backendless = _Backendless
  } catch {}
}

const handler: ProxyHandler<AnyObj> = {
  get(_target, prop) {
    if (!isBackendlessInited()) {
      throw new Error('Backendless API is not initialized. Call initBackendlessClient() first.')
    }
    return (_Backendless as any)[prop]
  },
  apply(_target, thisArg, argArray) {
    if (!isBackendlessInited()) {
      throw new Error('Backendless API is not initialized. Call initBackendlessClient() first.')
    }
    return (_Backendless as any).apply(thisArg, argArray)
  },
}

const proxy = new Proxy({}, handler) as AnyObj

export default proxy