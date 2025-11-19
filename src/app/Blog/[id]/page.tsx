import { backendlessFetch } from '@/lib/backendless'
import Image from 'next/image'

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const id = params.id

  // Fetch aman untuk server (Vercel)
  const result = await backendlessFetch('Posts', `where=objectId='${id}'&pageSize=1`).catch(() => null)
  const post = Array.isArray(result) && result.length > 0 ? result[0] : null

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Post not found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {post.CoverImage && (
          <div className="w-full mb-8 rounded-lg overflow-hidden shadow">
            <Image
              src={post.CoverImage}
              alt={post.Title}
              width={1200}
              height={600}
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.Title}</h1>

        <div className="text-gray-500 mb-6">
          {post.Author && <span>By {post.Author}</span>}
        </div>

        <article className="prose prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.Body || '' }} />
        </article>
      </div>
    </div>
  )
};