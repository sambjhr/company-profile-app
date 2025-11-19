'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Backendless from 'backendless'

/**
 * Init Backendless
 */
if (process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID && process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY) {
  try {
    Backendless.initApp(
      process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID,
      process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
    )
  } catch {}
}

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Masukkan email dan password.')
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

      window.dispatchEvent(new Event('authChanged'))

      router.push('/')
    } catch (err: any) {
      const msg = err?.message || 'Login gagal, periksa email & password.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      {/* CARD */}
      <div className="px-6 py-6 bg-gray-200 p-20 md:p-10 shadow-lg">
        
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center text-black mb-10">
          Login
        </h1>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-8">

          {/* EMAIL */}
          <div className="space-y-3">
            <label className="block text-xl font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full text-lg px-6 py-4 text-gray-500 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-3">
            <label className="block text-xl font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your@password"
              className="w-full text-lg px-5 py-4 text-gray-500 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="text-sm text-red-700 bg-red-50 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 hover:bg-orange-300 text-gray-800 text-xl font-semibold py-4 rounded-2xl shadow-md transition-all disabled:opacity-60"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => alert('Implement forgot password di Backendless')}
            className="text-lg text-gray-600 underline"
          >
            Forget Password
          </button>
        </div>
      </div>
    </div>
  )
}