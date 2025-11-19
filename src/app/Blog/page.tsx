// src/app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { backendlessFetch } from '@/lib/backendless'
import React from 'react'

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

export default async function BlogPage() {
  // fetch posts from Backendless "Posts" table (adjust table name if beda)
  // sort by created desc; pageSize set to 12
  const query = 'sortBy=created%20DESC&pageSize=12'
  const posts: Post[] = await backendlessFetch<Post[]>('Posts', query).catch((err) => {
    console.error(err)
    return []
  })

  return (
    <section className="bg-white text-gray-800 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-orange-400">Blog</span>
          </h1>
          <p className="text-sm text-gray-800 mt-2">News, insights, and updates.</p>
        </div>

        {/* filters placeholder (implement later) */}
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
            const date = p.created ? new Date(p.created).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
            const cover = p.CoverImage ?? '/image/default-post.jpg'

            return (
              <article key={p.objectId} className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-44">
                  <Image src={cover} alt={p.Title} fill className="object-cover" />
                </div>

                <div className="p-5">
                  {/* category badge */}
                  {p.Category && (
                    <span className="inline-block bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {p.Category}
                    </span>
                  )}

                  <div className="text-xs text-gray-500 mb-2">{p.Author ? `By ${p.Author}` : ''} {date && ` • ${date}`}</div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">{p.Title}</h3>

                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {p.Excerpt ?? p.Body?.slice(0, 160) ?? ''}
                  </p>

                  <Link href={`/blog/${p.objectId}`} className="text-sm text-gray-800 bg-orange-400 font-semibold rounded-2xl py-1 px-3">
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
}