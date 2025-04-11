import type { Metadata } from "next"
import WalletView from "@/components/wallet/wallet-view"

export const metadata: Metadata = {
  title: "Wallet & Transactions",
  description: "Manage your wallet and view transactions",
}

export default function WalletPage() {
  return <WalletView />
}
