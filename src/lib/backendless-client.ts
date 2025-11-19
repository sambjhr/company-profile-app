// src/lib/backendless-client.ts
let _inited = false
let _Backendless: any = null

export function isBackendlessInited() {
  return _inited
}

export async function initBackendlessClient() {
  if (_inited) return _Backendless
  const appId = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID
  const jsKey = process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
  if (!appId || !jsKey) throw new Error('Missing NEXT_PUBLIC_BACKENDLESS env vars')
  const pkg = await import('backendless')
  const Backendless = (pkg && pkg.default) ? pkg.default : pkg
  // init once
  if (!(Backendless as any)._inited) {
    Backendless.initApp(appId, jsKey)
    ;(Backendless as any)._inited = true
  }
  _Backendless = Backendless
  _inited = true
  return _Backendless
}

export function getBackendless() {
  if (!_inited || !_Backendless) throw new Error('Backendless not initialized')
  return _Backendless
}