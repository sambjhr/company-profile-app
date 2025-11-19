import Link from 'next/link'
import Image from 'next/image'
import { backendlessFetch, hasServerCredentials } from '@/lib/backendless'

type Post = {
  objectId: string
  Title: string
  Body?: string
  Excerpt?: string
  Author?: string
  Category?: string
  CoverImage?: string // path or full URL
  created?: string
}

function normalizeCoverUrl(url?: string) {
  if (!url) return '/image/default-post.jpg'
  // if already absolute url
  if (/^https?:\/\//i.test(url)) return url
  // if starts with slash, keep as is (assume public folder)
  if (url.startsWith('/')) return url
  // otherwise treat as relative filename in /image/
  return `/image/${url}`
}

export default async function BlogPage() {
  // If server credentials are not set (e.g. during build/preview), show friendly fallback
  if (!hasServerCredentials()) {
    return (
      <section className="bg-white text-gray-800 py-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Our <span className="text-orange-400">Blog</span>
            </h1>
            <p className="text-sm text-gray-800 mt-2">Blog saat ini tidak tersedia (credential server belum diset).</p>
          </div>

          <div className="rounded-lg border border-dashed border-gray-200 p-12 text-center text-gray-500">
            Data blog tidak dapat dimuat karena konfigurasi server belum lengkap.
          </div>
        </div>
      </section>
    )
  }

  // fetch posts safely (backendlessFetch may return null)
  const query = 'sortBy=created%20DESC&pageSize=12'
  let posts: Post[] = []
  try {
    const result = await backendlessFetch<Post[]>('Posts', query)
    posts = Array.isArray(result) ? result : []
  } catch (err) {
    console.error('Failed to load posts:', err)
    posts = []
  }

  return (
    <section className="bg-white text-gray-800 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-orange-400">Blog</span>
          </h1>
          <p className="text-sm text-gray-800 mt-2">News, insights, and updates.</p>
        </div>

        {/* filters placeholder */}
        <div className="flex gap-3 justify-center mb-8">
          <button className="px-3 py-1 rounded-full bg-orange-400 text-white text-sm">All</button>
          <button className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">Berita</button>
          <button className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">Konstruksi Kami</button>
        </div>

        {/* Grid posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-16">No posts yet.</div>
          )}

          {posts.map((p) => {
            const date = p.created
              ? new Date(p.created).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
              : ''
            const cover = normalizeCoverUrl(p.CoverImage)

            return (
              <article key={p.objectId} className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-44">
                  {/* unoptimized supaya tidak perlu konfigurasi domains saat testing */}
                  <Image src={cover} alt={p.Title || 'Post cover'} fill unoptimized className="object-cover" />
                </div>

                <div className="p-5">
                  {/* category badge */}
                  {p.Category && (
                    <span className="inline-block bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {p.Category}
                    </span>
                  )}

                  <div className="text-xs text-gray-500 mb-2">{p.Author ? `By ${p.Author}` : ''}{date && ` • ${date}`}</div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{p.Title}</h3>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {p.Excerpt ?? (p.Body ? (p.Body.replace(/<[^>]+>/g, '').slice(0, 160)) : '')}
                  </p>

                  <Link
                    href={`/blog/${p.objectId}`}
                    className="inline-block bg-orange-400 text-white font-semibold rounded-2xl py-1 px-3 text-sm"
                    aria-label={`Read more about ${p.Title}`}
                  >
                    Read More
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
};