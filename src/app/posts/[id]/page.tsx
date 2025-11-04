"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getPost, deletePost } from "@/lib/posts"
import { Post } from "@/types/post"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import Link from "next/link"

export default function PostDetailPage() {
  useRequireAuth()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPost(Number(id))
        setPost(res.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const handleDelete = async () => {
    if (confirm("Yakin ingin menghapus post ini?")) {
      try {
        await deletePost(Number(id))
        router.push("/")
      } catch (err: any) {
        alert("Gagal menghapus post.")
      }
    }
  }

  if (loading) return <p>Loading...</p>
  if (error || !post)
    return <p className="text-red-500">Gagal memuat post: {error}</p>

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex gap-2">
          <Link href={`/posts/${id}/edit`} className="btn btn-outline btn-sm">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-sm">
            Hapus
          </button>
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
    </div>
  )
}
