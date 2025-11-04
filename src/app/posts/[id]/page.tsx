"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getPost, deletePost } from "@/lib/posts"
import { Post } from "@/types/post"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import Link from "next/link"
import LoadingOverlay from "@/components/LoadingOverlay"
import ErrorModal from "@/components/ErrorModal"

export default function PostDetailPage() {
  useRequireAuth()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPost(Number(id))
        setPost(res.data)
      } catch (err: any) {
        setErrorMsg("Gagal memuat post.")
        setErrorModal(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus post ini?")) return
    setDeleting(true)
    try {
      await deletePost(Number(id))
      router.push("/")
    } catch (err: any) {
      if (err.message?.includes("Unauthorized")) {
        setErrorMsg("Kamu tidak memiliki izin untuk menghapus post ini.")
      } else {
        setErrorMsg("Terjadi kesalahan saat menghapus post.")
      }
      setErrorModal(true)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingOverlay text="Memuat post..." />
  if (!post) return null

  return (
    <div className="max-w-3xl mx-auto relative">
      {deleting && <LoadingOverlay text="Menghapus post..." />}
      <ErrorModal
        open={errorModal}
        message={errorMsg}
        onClose={() => setErrorModal(false)}
      />

      <div className="flex justify-between items-center mb-4 py-8">
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
