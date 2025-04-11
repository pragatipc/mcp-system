"use server"

import connectToDatabase from "@/lib/mongodb"
import Partner from "@/models/Partner"
import { revalidatePath } from "next/cache"

export async function getPartners() {
  try {
    await connectToDatabase()
    const partners = await Partner.find({}).sort({ joinDate: -1 })
    return JSON.parse(JSON.stringify(partners))
  } catch (error) {
    console.error("Failed to fetch partners:", error)
    throw new Error("Failed to fetch partners")
  }
}

export async function getPartnerById(id: string) {
  try {
    await connectToDatabase()
    const partner = await Partner.findById(id)
    return JSON.parse(JSON.stringify(partner))
  } catch (error) {
    console.error(`Failed to fetch partner with ID ${id}:`, error)
    throw new Error("Failed to fetch partner")
  }
}

export async function addPartner(formData: FormData) {
  try {
    await connectToDatabase()

    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const commission = formData.get("commission") as string

    if (!name || !phone || !email) {
      throw new Error("Missing required fields")
    }

    const newPartner = new Partner({
      name,
      phone,
      email,
      status: "active",
      orders: 0,
      completed: 0,
      walletBalance: 0,
      joinDate: new Date(),
    })

    await newPartner.save()
    revalidatePath("/partners")
    return { success: true, message: "Partner added successfully" }
  } catch (error) {
    console.error("Failed to add partner:", error)
    return { success: false, message: "Failed to add partner" }
  }
}

export async function updatePartnerStatus(id: string, status: "active" | "inactive") {
  try {
    await connectToDatabase()
    await Partner.findByIdAndUpdate(id, { status })
    revalidatePath("/partners")
    return { success: true, message: "Partner status updated successfully" }
  } catch (error) {
    console.error(`Failed to update partner status for ID ${id}:`, error)
    return { success: false, message: "Failed to update partner status" }
  }
}

export async function deletePartner(id: string) {
  try {
    await connectToDatabase()
    await Partner.findByIdAndDelete(id)
    revalidatePath("/partners")
    return { success: true, message: "Partner deleted successfully" }
  } catch (error) {
    console.error(`Failed to delete partner with ID ${id}:`, error)
    return { success: false, message: "Failed to delete partner" }
  }
}

export async function addFundsToPartner(id: string, amount: number, notes = "") {
  try {
    await connectToDatabase()
    const partner = await Partner.findById(id)

    if (!partner) {
      throw new Error("Partner not found")
    }

    partner.walletBalance += amount
    await partner.save()

    revalidatePath("/partners")
    revalidatePath("/wallet")
    return { success: true, message: "Funds added successfully" }
  } catch (error) {
    console.error(`Failed to add funds to partner with ID ${id}:`, error)
    return { success: false, message: "Failed to add funds" }
  }
}
