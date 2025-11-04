"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getPost, updatePost } from "@/lib/posts"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import FormInput from "@/components/FormInput"

export default function EditPostPage() {
  useRequireAuth()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState({ title: "", content: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPost(Number(id))
        setForm({
          title: res.data.title,
          content: res.data.content,
        })
      } catch (err: any) {
        setError("Gagal memuat data post.")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updatePost(Number(id), form)
      router.push(`/posts/${id}`)
    } catch (err: any) {
      alert("Gagal memperbarui post.")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Judul"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Konten"
          name="content"
          textarea
          value={form.content}
          onChange={handleChange}
          required
        />
        {error && (
          <div className="alert alert-error text-sm mb-3 py-2">{error}</div>
        )}
        <button type="submit" className="btn btn-primary">
          Simpan Perubahan
        </button>
      </form>
    </div>
  )
}
