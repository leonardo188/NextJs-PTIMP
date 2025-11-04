"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPost } from "@/lib/posts"
import FormInput from "@/components/FormInput"
import { useRequireAuth } from "@/hooks/useRequireAuth"

export default function NewPostPage() {
  useRequireAuth()
  const router = useRouter()
  const [form, setForm] = useState({ title: "", content: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await createPost(form)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Gagal membuat post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Buat Post Baru</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Judul"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Masukkan judul post"
          required
        />
        <FormInput
          label="Konten"
          name="content"
          textarea
          value={form.content}
          onChange={handleChange}
          placeholder="Tulis isi post di sini..."
          required
        />
        {error && (
          <div className="alert alert-error text-sm mb-3 py-2">
            ⚠️ {error}
          </div>
        )}
        <button
          type="submit"
          className={`w-full btn btn-primary ${loading ? "loading" : ""}`}
        >
          Simpan
        </button>
      </form>
    </div>
  )
}
