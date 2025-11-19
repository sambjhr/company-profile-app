'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Backendless from 'backendless'

/**
 * Client-side init Backendless
 */
if (
  process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID &&
  process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
) {
  try {
    Backendless.initApp(
      process.env.NEXT_PUBLIC_BACKENDLESS_APP_ID,
      process.env.NEXT_PUBLIC_BACKENDLESS_JS_KEY
    )
  } catch {}
} else {
  console.warn('Missing NEXT_PUBLIC_BACKENDLESS env vars for client create-post.')
}

export default function CreateBlogPage() {
  const router = useRouter()

  // protect route (client-side)
  useEffect(() => {
    const logged = localStorage.getItem('loggedIn') === 'true'
    if (!logged) {
      router.replace('/login')
    }
  }, [router])

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

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setLoading(true)

    try {
      let coverUrl: string | null = null

      // 1) Upload file to Backendless Files (if ada)
      if (file) {
        const uploaded = await Backendless.Files.upload(file, 'posts', true)
        if (Array.isArray(uploaded) && uploaded.length > 0) {
          coverUrl = uploaded[0].fileURL || uploaded[0].fileUrl || uploaded[0].url
        } else if ((uploaded as any).fileURL) {
          coverUrl = (uploaded as any).fileURL
        } else if ((uploaded as any).url) {
          coverUrl = (uploaded as any).url
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
      router.replace('/Blog')
      // clear form after a short delay and redirect to /blog
      setTimeout(() => {
        router.push('/blog')
      }, 800)
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
                  disabled={loading}
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