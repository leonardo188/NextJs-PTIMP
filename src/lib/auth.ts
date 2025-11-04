import { apiFetch } from "./api"
import { useAuthStore } from "@/store/useAuthStore"

interface AuthResponse {
  data: {
    token: string
    user: {
      id: number
      name: string
      email: string
    }
  }
}

export async function login(email: string, password: string) {
  const response = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  const { token, user } = response.data
  useAuthStore.getState().setToken(token)
  useAuthStore.getState().setUser(user)
  return user
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password_confirmation }),
  })
}

export async function logout() {
  const { token, logout } = useAuthStore.getState()
  await apiFetch("/auth/logout", { method: "POST" }, token || undefined)
  logout()
}
