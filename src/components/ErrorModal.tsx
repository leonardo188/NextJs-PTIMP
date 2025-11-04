"use client"
import { useEffect } from "react"

interface ErrorModalProps {
  open: boolean
  title?: string
  message: string
  onClose: () => void
}

export default function ErrorModal({
  open,
  title = "Akses Ditolak!",
  message,
  onClose,
}: ErrorModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (open) document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-neutral">
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
