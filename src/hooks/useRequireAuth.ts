"use client"
import { useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"

export function useRequireAuth() {
  const { token } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])
}
