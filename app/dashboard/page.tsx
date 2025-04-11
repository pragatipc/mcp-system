import type { Metadata } from "next"
import DashboardView from "@/components/dashboard/dashboard-view"

export const metadata: Metadata = {
  title: "MCP Dashboard",
  description: "Micro Collection Partner Dashboard",
}

export default function DashboardPage() {
  return <DashboardView />
}
