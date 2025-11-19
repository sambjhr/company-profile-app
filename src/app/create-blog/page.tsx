// src/app/create-blog/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateBlogPage() {
  const router = useRouter()

  // store Backendless instance (dynamic import) in ref
  const backendlessRef = useRef<any | null>(null)
  const [backendlessReady, setBackendlessReady] = useState(false)

  // protect route (client-side)
  useEffect(() => {
    const logged = localStorage.getItem('loggedIn') === 'true'
    if (!logged) {
      router.replace('/login')
    }
  }, [router])

  // init Backendless on client only (dynamic import)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (!process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID || !process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY) {
          console.warn('Missing NEXT_PUBLIC_BACKENDLESS envs for client create-post.')
          return
        }
        const BackendlessLib = (await import('backendless')).default
        try {
          BackendlessLib.initApp(
            process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID,
            process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
          )
        } catch (e) {
          // ignore double-init during HMR
          console.warn('Backendless initApp warning (ignored)', e)
        }
        if (mounted) {
          backendlessRef.current = BackendlessLib
          setBackendlessReady(true)
        }
      } catch (err) {
        console.error('Could not load backendless client:', err)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  // form state
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('RPA')
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [published, setPublished] = useState(true)

  // ui state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // file preview
  useEffect(() => {
    if (!file) return setPreview(null)
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  // form validation basic
  function validate() {
    if (!title.trim()) return 'Judul wajib diisi'
    if (!excerpt.trim()) return 'Ringkasan (excerpt) wajib diisi'
    if (!author.trim()) return 'Author wajib diisi'
    if (!body.trim()) return 'Isi artikel wajib diisi'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!backendlessReady || !backendlessRef.current) {
      setError('Backendless belum siap. Coba lagi sebentar.')
      return
    }

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setLoading(true)

    try {
      let coverUrl: string | null = null
      const Backendless = backendlessRef.current

      // 1) Upload file to Backendless Files (if ada)
      if (file) {
        try {
          const uploaded = await Backendless.Files.upload(file, 'posts', true)
          if (Array.isArray(uploaded) && uploaded.length > 0) {
            coverUrl = uploaded[0].fileURL || uploaded[0].fileUrl || uploaded[0].url || null
          } else if ((uploaded as any).fileURL) {
            coverUrl = (uploaded as any).fileURL
          } else if ((uploaded as any).url) {
            coverUrl = (uploaded as any).url
          }
        } catch (err) {
          console.error('Upload file failed', err)
          throw new Error('Gagal mengunggah file. Coba lagi.')
        }
      }

      // 2) Prepare post object
      const postObj: Record<string, any> = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        body: body.trim(),
        author: author.trim(),
        category,
        published: !!published,
      }
      if (coverUrl) postObj.coverImage = coverUrl

      // 3) Save to Backendless Data table "Posts"
      await Backendless.Data.of('Posts').save(postObj)

      setSuccess('Postingan berhasil dibuat.')
      // clear form
      setTitle('')
      setExcerpt('')
      setAuthor('')
      setBody('')
      setFile(null)
      setPreview(null)
      setCategory('RPA')

      // Redirect to blog list (gunakan satu route). sesuaikan kapitalisasi route project-mu
      router.push('/Blog')
    } catch (err: any) {
      console.error('Create post failed', err)
      const msg = err?.message || 'Gagal membuat postingan. Cek console.'
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 p-6">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link + Title */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 p-6 text-center">
            Create <span className="text-orange-400">New Post</span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border-gray-100 rounded-br-xl shadow-sm p-8">
          {/* backendless not ready */}
          {!backendlessReady && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
              Backendless client belum siap. Pastikan NEXT_PUBLIC_BACKENDLESS_APP_ID dan NEXT_PUBLIC_BACKENDLESS_JS_KEY di-set.
            </div>
          )}

          {/* alerts */}
          {error && <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>}
          {success && <div className="mb-4 text-sm text-green-700 bg-green-50 p-3 rounded">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">Post Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul postingan"
                className="w-full text-lg px-6 py-4 text-gray-600 bg-gray-100 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
              />
            </div>

            {/* Slug (read-only placeholder) */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">Slug</label>
              <input
                value={title ? title.toLowerCase().replace(/[^a-z0-9\- ]/g, '').replace(/\s+/g, '-') : 'n/a'}
                readOnly
                className="w-full text-lg px-6 py-4 text-gray-600 bg-gray-100 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
              />
            </div>

            {/* Category + Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-lg px-6 py-4 text-gray-600 bg-gray-100 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
                >
                  <option>Berita</option>
                  <option>Konstruksi Kami</option>
                </select>
              </div>

              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nama penulis"
                  className="w-full text-lg px-6 py-4 text-gray-600 bg-gray-100 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">Summary</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                placeholder="A brief summary of the post..."
                className="w-full px-4 py-3 rounded-lg text-gray-600 bg-gray-100 border border-gray-300 border-transparent focus:outline-none"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">Isi Berita</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={8}
                placeholder="<p>Konten artikel (HTML diperbolehkan)</p>"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-100 focus:outline-none"
              />
            </div>

            {/* Cover image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image (opsional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-gray-700"
              />
              {preview && (
                <div className="mt-3">
                  <div className="w-full h-48 rounded-md overflow-hidden border">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>

            {/* Published checkbox + actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <input
                  id="published"
                  type="checkbox"
                  checked={published}
                  onChange={() => setPublished((s) => !s)}
                  className="w-4 h-4 text-orange-500"
                />
                <label htmlFor="published" className="text-sm text-gray-700">Published</label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // reset form
                    setTitle('')
                    setExcerpt('')
                    setAuthor('')
                    setBody('')
                    setFile(null)
                    setPreview(null)
                    setCategory('RPA')
                    setError(null)
                    setSuccess(null)
                  }}
                  className="px-3 py-1 rounded-lg border border-gray-100 text-gray-600"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={loading || !backendlessReady}
                  className="px-5 py-2 rounded-lg bg-[#ff6a00] hover:bg-[#ff7a00] text-white font-semibold shadow disabled:opacity-60"
                >
                  {loading ? 'Menyimpan...' : 'Publish Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}