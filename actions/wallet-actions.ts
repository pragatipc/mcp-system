"use server"

import connectToDatabase from "@/lib/mongodb"
import Wallet from "@/models/Wallet"
import Transaction from "@/models/Transaction"
import Partner from "@/models/Partner"
import { revalidatePath } from "next/cache"

export async function getWalletBalance() {
  try {
    await connectToDatabase()

    // Get or create the main wallet
    let wallet = await Wallet.findOne({})

    if (!wallet) {
      wallet = new Wallet({ balance: 0 })
      await wallet.save()
    }

    return wallet.balance
  } catch (error) {
    console.error("Failed to fetch wallet balance:", error)
    throw new Error("Failed to fetch wallet balance")
  }
}

export async function getTransactions() {
  try {
    await connectToDatabase()
    const transactions = await Transaction.find({}).sort({ date: -1 })
    return JSON.parse(JSON.stringify(transactions))
  } catch (error) {
    console.error("Failed to fetch transactions:", error)
    throw new Error("Failed to fetch transactions")
  }
}

export async function addFundsToWallet(formData: FormData) {
  try {
    await connectToDatabase()

    const amount = Number(formData.get("amount"))
    const paymentMethod = formData.get("paymentMethod") as string

    if (!amount || amount <= 0) {
      throw new Error("Invalid amount")
    }

    // Get or create the main wallet
    let wallet = await Wallet.findOne({})

    if (!wallet) {
      wallet = new Wallet({ balance: 0 })
    }

    wallet.balance += amount
    await wallet.save()

    // Create a transaction record
    const transaction = new Transaction({
      type: "deposit",
      amount,
      description: `Added funds via ${paymentMethod}`,
      date: new Date(),
      status: "completed",
    })

    await transaction.save()

    revalidatePath("/wallet")
    revalidatePath("/dashboard")
    return { success: true, message: "Funds added successfully" }
  } catch (error) {
    console.error("Failed to add funds to wallet:", error)
    return { success: false, message: "Failed to add funds" }
  }
}

export async function transferFundsToPartner(formData: FormData) {
  try {
    await connectToDatabase()

    const partnerId = formData.get("partnerId") as string
    const amount = Number(formData.get("amount"))
    const notes = (formData.get("notes") as string) || ""

    if (!partnerId || !amount || amount <= 0) {
      throw new Error("Invalid input")
    }

    // Get the main wallet
    const wallet = await Wallet.findOne({})

    if (!wallet || wallet.balance < amount) {
      throw new Error("Insufficient funds")
    }

    // Get the partner
    const partner = await Partner.findById(partnerId)

    if (!partner) {
      throw new Error("Partner not found")
    }

    // Update wallet balances
    wallet.balance -= amount
    await wallet.save()

    partner.walletBalance += amount
    await partner.save()

    // Create a transaction record
    const transaction = new Transaction({
      type: "transfer",
      amount,
      description: `Transfer to ${partner.name}${notes ? ": " + notes : ""}`,
      date: new Date(),
      status: "completed",
      partnerId: partner._id,
    })

    await transaction.save()

    revalidatePath("/wallet")
    revalidatePath("/partners")
    return { success: true, message: "Funds transferred successfully" }
  } catch (error) {
    console.error("Failed to transfer funds:", error)
    return { success: false, message: error instanceof Error ? error.message : "Failed to transfer funds" }
  }
}

export async function withdrawFunds(formData: FormData) {
  try {
    await connectToDatabase()

    const amount = Number(formData.get("amount"))
    const bankAccount = formData.get("bankAccount") as string

    if (!amount || amount <= 0 || !bankAccount) {
      throw new Error("Invalid input")
    }

    // Get the main wallet
    const wallet = await Wallet.findOne({})

    if (!wallet || wallet.balance < amount) {
      throw new Error("Insufficient funds")
    }

    // Update wallet balance
    wallet.balance -= amount
    await wallet.save()

    // Create a transaction record
    const transaction = new Transaction({
      type: "withdrawal",
      amount,
      description: `Withdrawal to bank account ${bankAccount}`,
      date: new Date(),
      status: "completed",
    })

    await transaction.save()

    revalidatePath("/wallet")
    return { success: true, message: "Funds withdrawn successfully" }
  } catch (error) {
    console.error("Failed to withdraw funds:", error)
    return { success: false, message: error instanceof Error ? error.message : "Failed to withdraw funds" }
  }
}
