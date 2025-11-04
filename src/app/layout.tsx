import "./globals.css"
import { Inter } from "next/font/google"
import MainLayout from "@/layouts/MainLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog App | IMP Assessment",
  description: "Simple blog system built with Next.js + Laravel API",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
