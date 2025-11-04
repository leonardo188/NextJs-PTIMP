"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "@/layouts/AuthLayout"
import FormInput from "@/components/FormInput"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      router.push("/") 
    } catch (err: any) {
      setError(err.message || "Login gagal. Periksa kembali email/password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-sm text-center mt-3">
          Belum punya akun?{" "}
          <a href="/register" className="link link-primary">
            Daftar di sini
          </a>
        </p>
      </form>
    </AuthLayout>
  )
}
