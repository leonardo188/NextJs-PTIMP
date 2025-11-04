"use client"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-base-100 border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>
        {children}
      </div>
    </div>
  )
}
