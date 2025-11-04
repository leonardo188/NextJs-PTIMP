"use client"
import { ReactNode } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"

export default function MainLayout({ children }: { children: ReactNode }) {
  const { token } = useAuthStore()
  const pathname = usePathname()

  const hideNavbarOn = ["/login", "/register"]
  const shouldShowNavbar = token && !hideNavbarOn.includes(pathname)

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {shouldShowNavbar && <Navbar />} 
      <main className="flex-1 p-6">{children}</main>
      {shouldShowNavbar && (
        <footer className="footer footer-center bg-base-300 p-4 text-base-content">
          <aside>
            <p>© {new Date().getFullYear()} PT Informatika Media Pratama</p>
          </aside>
        </footer>
      )}
    </div>
  )
}
