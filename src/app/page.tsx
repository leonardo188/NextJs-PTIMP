"use client"
import { useEffect, useState } from "react"
import { getPosts } from "@/lib/posts"
import { Post, PaginatedResponse } from "@/types/post"
import PostCard from "@/components/PostCard"
import Pagination from "@/components/Pagination"
import Link from "next/link"
import { useRequireAuth } from "@/hooks/useRequireAuth"

export default function HomePage() {
  useRequireAuth()

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginatedResponse<Post> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadPosts = async (p: number) => {
    try {
      setLoading(true)
      const data = await getPosts(p)
      setPosts(data.data)
      setPagination(data)
    } catch (err: any) {
      setError(err.message || "Gagal memuat data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts(page)
  }, [page])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Link href="/posts/new" className="btn btn-primary btn-sm">
          + New Post
        </Link>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="alert alert-error mb-4 py-2 text-sm">{error}</div>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-500">Belum ada post.</p>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {pagination && pagination.last_page > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.last_page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  )
}
