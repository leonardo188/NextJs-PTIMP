import { apiFetch } from "./api"
import { Post, ApiResponse, PaginatedResponse } from "@/types/post"
import { useAuthStore } from "@/store/useAuthStore"

// Get all posts (with pagination)
export async function getPosts(page = 1): Promise<PaginatedResponse<Post>> {
  return apiFetch(`/posts?page=${page}`)
}

// Get single post
export async function getPost(id: number): Promise<ApiResponse<Post>> {
  return apiFetch(`/posts/${id}`)
}

// Create post (requires token)
export async function createPost(data: { title: string; content: string }) {
  const { token } = useAuthStore.getState()
  if (!token) throw new Error("Not authenticated")

  return apiFetch("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  }, token)
}

// Update post
export async function updatePost(id: number, data: { title: string; content: string }) {
  const { token } = useAuthStore.getState()
  if (!token) throw new Error("Not authenticated")

  return apiFetch(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, token)
}

// Delete post
export async function deletePost(id: number) {
  const { token } = useAuthStore.getState()
  if (!token) throw new Error("Not authenticated")

  return apiFetch(`/posts/${id}`, { method: "DELETE" }, token)
}
