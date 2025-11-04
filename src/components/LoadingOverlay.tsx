"use client"
export default function LoadingOverlay({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100/70 backdrop-blur-sm z-[9999]">
      <div className="flex flex-col items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base font-medium text-gray-700">{text}</p>
      </div>
    </div>
  )
}
