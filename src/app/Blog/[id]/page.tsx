// src/app/blog/[id]/page.tsx
import Image from 'next/image'
import { backendlessFetch } from '@/lib/backendless'
import React from 'react'

type Post = {
  objectId: string
  Title: string
  Body?: string
  CoverImage?: string
  Author?: string
  Category?: string
  created?: string
}

interface Props { params: { id: string } }

export default async function BlogDetail({ params }: Props) {
  const { id } = params
  // request single object by objectId => backendless data API supports /data/{table}/{objectId}
  const urlTable = 'Posts'
  // direct fetch via helper (we can call endpoint for specific id)
  const endpoint = `${process.env.BACKENDLESS_API_BASE ?? 'https://api.backendless.com'}/${process.env.BACKENDLESS_APP_ID}/${process.env.BACKENDLESS_REST_API_KEY}/data/${urlTable}/${id}`

  const res = await fetch(endpoint, { cache: 'no-store' })
  if (!res.ok) {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold">Post not found</h2>
        </div>
      </section>
    )
  }
  const post: Post = await res.json()

  const date = post.created ? new Date(post.created).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
  const cover = post.CoverImage ?? '/image/default-post.jpg'

  return (
    <article className="bg-gray-800 text-gray-100 min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          {post.Category && <span className="inline-block bg-orange-400 text-white text-xs px-3 py-1 rounded-full">{post.Category}</span>}
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">{post.Title}</h1>
          <div className="text-sm text-gray-400 mt-2">{post.Author ? `By ${post.Author}` : ''} {date && ` • ${date}`}</div>
        </div>

        <div className="rounded-lg overflow-hidden mb-8">
          <div className="relative w-full h-64">
            <Image src={cover} alt={post.Title} fill className="object-cover" />
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-gray-200" dangerouslySetInnerHTML={{ __html: post.Body ?? '' }} />
      </div>
    </article>
  )
}