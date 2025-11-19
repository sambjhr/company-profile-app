'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Backendless, { initBackendlessClient, isBackendlessInited } from '@/lib/backendless-client'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [backendlessReady, setBackendlessReady] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true
    initBackendlessClient()
      .then(() => {
        if (mounted) setBackendlessReady(true)
      })
      .catch(() => {
        if (mounted) setBackendlessReady(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Masukkan email dan password.')
      return
    }

    if (!backendlessReady) {
      setError('Backendless API is not configured, make sure you set NEXT_PUBLIC_BACKENDLESS_APP_ID and NEXT_PUBLIC_BACKENDLESS_JS_KEY.')
      return
    }

    setLoading(true)
    try {
      const user = await Backendless.UserService.login(email, password, true)

      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('backendlessUser', JSON.stringify(user))
      if ((user as any).userToken) {
        localStorage.setItem('backendlessUserToken', (user as any).userToken)
      }

      // notify other tabs / navbar to refresh auth state
      window.dispatchEvent(new Event('authChanged'))

      router.push('/')
    } catch (err: any) {
      console.error('Login error', err)
      const msg = err?.message || err?.statusMessage || 'Login gagal, periksa email & password.'
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-lg px-8 py-8 bg-gray-100 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Login</h1>

        {!backendlessReady && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            Backendless API is not configured, make sure NEXT_PUBLIC_BACKENDLESS_APP_ID and NEXT_PUBLIC_BACKENDLESS_JS_KEY are set.
          </div>
        )}

        {error && backendlessReady && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-lg text-gray-800  font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-6 py-4 rounded-2xl text-gray-500  bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-lg text-gray-800 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-white border text-gray-500  border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !backendlessReady}
            className="w-full bg-[#ff6a00] hover:bg-[#ff7a00] text-white text-xl font-semibold py-4 rounded-2xl shadow-md transition disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => alert('Implement forgot password flow')} className="text-gray-600 underline">
            Forget Password
          </button>
        </div>
      </div>
    </div>
  )
}