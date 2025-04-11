import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, check authentication here
  // If not authenticated, show login page
  // For demo purposes, we'll redirect to dashboard
  redirect("/dashboard")
}
