import type { Metadata } from "next"
import PartnersView from "@/components/partners/partners-view"

export const metadata: Metadata = {
  title: "Pickup Partners",
  description: "Manage your pickup partners",
}

export default function PartnersPage() {
  return <PartnersView />
}
