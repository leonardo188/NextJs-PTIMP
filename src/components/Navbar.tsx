"use client"
import Link from "next/link"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { token, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100 backdrop-blur-lg border-b border-base-200 shadow-sm px-6">
      <div className="flex-1">
        <Link
          href="/"
          className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Blog App
        </Link>
      </div>

      <div className="flex gap-3 items-center justify-between w-1/5">
        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary transition">
          Posts
        </Link>

        {token ? (
          <>
            <Link
              href="/posts/new"
              className="btn btn-sm bg-linear-to-r from-pink-500 to-fuchsia-500 text-white border-none hover:opacity-90 transition"
            >
              + New Post
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-sm bg-linear-to-r from-rose-400 to-orange-400 text-white border-none hover:opacity-90 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-sm btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
