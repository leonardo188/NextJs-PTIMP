"use client"
import { ReactNode } from "react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-base-100">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back 👋</h1>
        {children}
        <div className="text-center mt-4">
          <Link href="/" className="link link-primary text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
