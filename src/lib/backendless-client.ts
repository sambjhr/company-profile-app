type AnyObj = Record<string, any>

let _Backendless: AnyObj | null = null
let _initPromise: Promise<void> | null = null

export function isBackendlessInited(): boolean {
  return Boolean(_Backendless && (_Backendless as any)._inited)
}

export async function initBackendlessClient(): Promise<void> {
  // only run in browser
  if (typeof window === 'undefined') return

  if (isBackendlessInited()) return

  if (_initPromise) return _initPromise

  _initPromise = (async () => {
    const appId = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID
    const jsKey = process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY

    if (!appId || !jsKey) {
      // reset init promise so caller can try again later
      _initPromise = null
      throw new Error('Missing NEXT_PUBLIC_BACKENDLESS_APP_ID or NEXT_PUBLIC_BACKENDLESS_JS_KEY')
    }

    // dynamic import so server build won't try to resolve "backendless"
    const mod = await import('backendless')
    const BackendlessLib = (mod as any).default ?? mod

    // use `any` to avoid TS complaints about missing types for initApp
    ;(BackendlessLib as any).initApp(appId, jsKey)
    ;(BackendlessLib as any)._inited = true

    _Backendless = BackendlessLib as AnyObj

    // optional: attach to window for debug
    try {
      ;(window as any).__Backendless = _Backendless
    } catch {}
  })()

  try {
    await _initPromise
  } catch (err) {
    // reset so future attempts can try again
    _initPromise = null
    throw err
  }
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