import Link from "next/link"
import { Post } from "@/types/post"

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="line-clamp-3 text-sm text-gray-600">{post.content}</p>
        <div className="card-actions justify-end mt-2">
          <Link href={`/posts/${post.id}`} className="btn btn-sm btn-outline">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
