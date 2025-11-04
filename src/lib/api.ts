const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.message || `Request failed: ${res.status}`)
  }

  return res.json()
}
