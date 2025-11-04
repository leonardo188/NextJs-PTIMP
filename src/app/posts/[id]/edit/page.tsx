"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getPost, updatePost } from "@/lib/posts"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import FormInput from "@/components/FormInput"
import LoadingOverlay from "@/components/LoadingOverlay"
import ErrorModal from "@/components/ErrorModal"

export default function EditPostPage() {
  useRequireAuth()
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [form, setForm] = useState({ title: "", content: "" })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPost(Number(id))
        setForm({
          title: res.data.title,
          content: res.data.content,
        })
      } catch {
        setErrorMsg("Gagal memuat data post.")
        setErrorModal(true)
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
    setSubmitting(true)
    try {
      await updatePost(Number(id), form)
      router.push(`/posts/${id}`)
    } catch (err: any) {
      if (err.message?.includes("Unauthorized")) {
        setErrorMsg("Kamu tidak memiliki izin untuk mengedit post ini.")
      } else {
        setErrorMsg("Terjadi kesalahan saat memperbarui post.")
      }
      setErrorModal(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingOverlay text="Memuat data post..." />

  return (
    <div className="max-w-3xl mx-auto">
      <ErrorModal
        open={errorModal}
        message={errorMsg}
        onClose={() => setErrorModal(false)}
      />

      <h1 className="text-2xl font-bold mb-6 py-8">Edit Post</h1>
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

        <button
          type="submit"
          className={`w-full btn btn-primary ${submitting ? "loading" : ""}`}
          disabled={submitting}
        >
          {submitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  )
}
