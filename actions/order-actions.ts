"use server"

import connectToDatabase from "@/lib/mongodb"
import Order from "@/models/Order"
import Partner from "@/models/Partner"
import { revalidatePath } from "next/cache"

export async function getOrders() {
  try {
    await connectToDatabase()
    const orders = await Order.find({}).sort({ date: -1 })
    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    throw new Error("Failed to fetch orders")
  }
}

export async function getOrderById(id: string) {
  try {
    await connectToDatabase()
    const order = await Order.findById(id)
    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    console.error(`Failed to fetch order with ID ${id}:`, error)
    throw new Error("Failed to fetch order")
  }
}

export async function assignPartnerToOrder(orderId: string, partnerId: string, notes = "") {
  try {
    await connectToDatabase()

    const order = await Order.findById(orderId)
    if (!order) {
      throw new Error("Order not found")
    }

    const partner = await Partner.findById(partnerId)
    if (!partner) {
      throw new Error("Partner not found")
    }

    order.partner = partner.name
    order.status = "in-progress"
    await order.save()

    partner.orders += 1
    await partner.save()

    revalidatePath("/orders")
    return { success: true, message: "Partner assigned successfully" }
  } catch (error) {
    console.error(`Failed to assign partner to order:`, error)
    return { success: false, message: "Failed to assign partner" }
  }
}

export async function updateOrderStatus(id: string, status: "pending" | "in-progress" | "completed") {
  try {
    await connectToDatabase()

    const order = await Order.findById(id)
    if (!order) {
      throw new Error("Order not found")
    }

    order.status = status
    await order.save()

    // If order is completed, update partner's completed orders count
    if (status === "completed" && order.partner) {
      const partner = await Partner.findOne({ name: order.partner })
      if (partner) {
        partner.completed += 1
        await partner.save()
      }
    }

    revalidatePath("/orders")
    return { success: true, message: "Order status updated successfully" }
  } catch (error) {
    console.error(`Failed to update order status for ID ${id}:`, error)
    return { success: false, message: "Failed to update order status" }
  }
}

export async function autoAssignOrders() {
  try {
    await connectToDatabase()

    // Get all pending orders
    const pendingOrders = await Order.find({ status: "pending" })

    // Get all active partners
    const activePartners = await Partner.find({ status: "active" })

    if (activePartners.length === 0) {
      return { success: false, message: "No active partners available for assignment" }
    }

    // Simple round-robin assignment
    for (let i = 0; i < pendingOrders.length; i++) {
      const order = pendingOrders[i]
      const partner = activePartners[i % activePartners.length]

      order.partner = partner.name
      order.status = "in-progress"
      await order.save()

      partner.orders += 1
      await partner.save()
    }

    revalidatePath("/orders")
    return { success: true, message: `${pendingOrders.length} orders assigned successfully` }
  } catch (error) {
    console.error("Failed to auto-assign orders:", error)
    return { success: false, message: "Failed to auto-assign orders" }
  }
}
