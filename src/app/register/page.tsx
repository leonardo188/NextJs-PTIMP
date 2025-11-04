"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "@/layouts/AuthLayout"
import FormInput from "@/components/FormInput"
import { register } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.password_confirmation
      )
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Pendaftaran gagal.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nama Lengkap"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="********"
          required
        />

        <FormInput
          label="Konfirmasi Password"
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="********"
          required
        />

        {error && (
          <div className="alert alert-error text-sm mb-3 py-2">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <p className="text-sm text-center mt-3">
          Sudah punya akun?{" "}
          <a href="/login" className="link link-primary">
            Login di sini
          </a>
        </p>
      </form>
    </AuthLayout>
  )
}
