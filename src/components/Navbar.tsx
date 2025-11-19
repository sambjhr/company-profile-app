'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Backendless from 'backendless'

/**
 * Initialize Backendless for client-side usage (if env present)
 */
if (
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID &&
  process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
) {
  try {
    Backendless.initApp(
      process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID,
      process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
    )
  } catch (e) {
    // ignore double-init in dev HMR
  }
}

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  // read login state from localStorage (safe on client)
  const readLoginFromStorage = useCallback(() => {
    try {
      const logged = localStorage.getItem('loggedIn') === 'true'
      setIsLoggedIn(logged)

      // optional: parse stored user object
      const raw = localStorage.getItem('backendlessUser')
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          // try several fields for a display name
          const display = parsed?.name || parsed?.fullname || parsed?.email || parsed?.profile?.name || null
          setUserName(display)
        } catch {
          setUserName(null)
        }
      } else {
        setUserName(null)
      }
    } catch {
      setIsLoggedIn(false)
      setUserName(null)
    }
  }, [])

  useEffect(() => {
  readLoginFromStorage()

  // untuk tab lain (storage event)
  function onStorage(e: StorageEvent) {
    if (e.key === 'loggedIn' || e.key === 'backendlessUser') {
      readLoginFromStorage()
    }
  }

  // untuk tab yang sama (custom event di-dispatch setelah login/logout)
  function onAuthChanged() {
    readLoginFromStorage()
  }

  window.addEventListener('storage', onStorage)
  window.addEventListener('authChanged', onAuthChanged as EventListener)

  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener('authChanged', onAuthChanged as EventListener)
  }
}, [readLoginFromStorage])

  // Logout handler: call Backendless (if available) then clear storage and redirect
  const handleLogout = async () => {
    try {
      if (Backendless && Backendless.UserService) {
        try {
          await Backendless.UserService.logout()
        } catch {
          // ignore logout errors
        }
      }
    } catch {
      // ignore
    }

    // clear keys we used
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('backendlessUser')
    localStorage.removeItem('backendlessUserToken')
    setIsLoggedIn(false)
    setUserName(null)

    // close mobile menu
    setOpen(false)

    // navigate to home (or login)
    router.push('/')
  }

  const navLinks = [
    { href: '/AboutUs', label: 'About Us' },
    { href: '/Layanan', label: 'Services' },
    { href: '/Blog', label: 'Blog List' },
    { href: '/Team', label: 'Teams' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/image/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded"
          />
          <span className="text-xl font-semibold tracking-wide text-black">
            Hobashita Taketama
          </span>
        </Link>

        {/* CENTER NAVIGATION */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
          {navLinks.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="hover:text-black transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Create Post jika login */}
          {isLoggedIn && (
            <Link 
              href="/create-blog"
              className="px-3 py-1 rounded-md bg-white text-orange-400 font-medium hover:bg-gray-200 transition"
            >
              Create Blog
            </Link>
          )}
        </nav>

        {/* RIGHT — LOGIN / USER + LOGOUT */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-[#ffbd59] hover:bg-[#ffd28e] transition font-semibold text-sm text-black shadow"
            >
              Login
            </Link>
          ) : (
            <>
              {/* Show user name (if available) */}
              <span className="text-gray-700 text-sm">{userName ?? 'admin'}</span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-[#ff6a00] hover:bg-[#ff7a00] transition font-semibold text-sm text-white shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-black"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <nav className="flex flex-col px-6 py-4 gap-4 text-gray-700 font-medium">

            {navLinks.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-black transition"
              >
                {item.label}
              </Link>
            ))}

            {/* Create Post - only if logged in */}
            {isLoggedIn && (
              <Link 
                href="/create-blog"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md bg-[#ff6a00] text-white font-medium hover:bg-[#ff7a00] transition"
              >
                Create Blog
              </Link>
            )}

            <div className="flex flex-col gap-3 mt-4">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-md bg-[#ffbd59] hover:bg-[#ffd28e] transition font-semibold text-sm text-black shadow w-fit"
                >
                  Login
                </Link>
              ) : (
                <>
                  <span className="text-sm text-gray-600">{userName ?? 'admin'}</span>
                  <button
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="w-fit px-4 py-2 rounded-md bg-[#ff6a00] hover:bg-[#ff7a00] transition font-semibold text-sm text-white shadow"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}