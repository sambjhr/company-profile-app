// src/lib/backendless-client.ts
import Backendless from 'backendless'

const APP_ID = process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID
const JS_KEY = process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY

let inited = false

export function initBackendlessClient() {
  if (typeof window === 'undefined') return
  if (inited) return
  if (!APP_ID || !JS_KEY) {
    // tidak throw — cukup warn, caller akan tunjukkan UI friendly
    console.warn('Missing NEXT_PUBLIC_BACKENDLESS env vars — Backendless client not initialized.')
    return
  }
  try {
    Backendless.initApp(APP_ID, JS_KEY)
    inited = true
    // console.log('Backendless client initialized')
  } catch (err) {
    // ignore double-init (HMR) dan tampilkan warning
    console.warn('Backendless.initApp error (ignored):', err)
  }
}

export function isBackendlessInited(): boolean {
  return inited
}

export default Backendless