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
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Blog App
        </Link>
      </div>

      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Posts</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link href="/posts/new" className="btn btn-primary btn-sm">
                  + New Post
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-error btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
