import type { Metadata } from "next"
import OrdersView from "@/components/orders/orders-view"

export const metadata: Metadata = {
  title: "Orders Management",
  description: "Manage and track orders",
}

export default function OrdersPage() {
  return <OrdersView />
}
