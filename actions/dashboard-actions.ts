"use server"

import connectToDatabase from "@/lib/mongodb"
import Partner from "@/models/Partner"
import Order from "@/models/Order"
import Wallet from "@/models/Wallet"

export async function getDashboardData() {
  try {
    await connectToDatabase()

    // Get wallet balance
    const wallet = await Wallet.findOne({})
    const walletBalance = wallet ? wallet.balance : 0

    // Get active partners count
    const activePartnersCount = await Partner.countDocuments({ status: "active" })

    // Get total orders count
    const totalOrdersCount = await Order.countDocuments({})

    // Get completed orders count
    const completedOrdersCount = await Order.countDocuments({ status: "completed" })

    // Get in-progress orders count
    const inProgressOrdersCount = await Order.countDocuments({ status: "in-progress" })

    // Get pending orders count
    const pendingOrdersCount = await Order.countDocuments({ status: "pending" })

    // Calculate completion rate
    const completionRate = totalOrdersCount > 0 ? Math.round((completedOrdersCount / totalOrdersCount) * 100) : 0

    // Get recent orders
    const recentOrders = await Order.find({}).sort({ date: -1 }).limit(5)

    // Get partner performance
    const partners = await Partner.find({ status: "active" }).sort({ completed: -1 }).limit(5)

    const partnerPerformance = partners.map((partner) => ({
      name: partner.name,
      initials: partner.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      completedOrders: partner.completed,
      totalOrders: partner.orders,
      performance: partner.orders > 0 ? Math.round((partner.completed / partner.orders) * 100) : 0,
    }))

    // Get partner funds
    const partnerFunds = partners.map((partner) => ({
      name: partner.name,
      walletBalance: partner.walletBalance,
    }))

    return {
      walletBalance,
      activePartnersCount,
      totalOrdersCount,
      completedOrdersCount,
      inProgressOrdersCount,
      pendingOrdersCount,
      completionRate,
      recentOrders: JSON.parse(JSON.stringify(recentOrders)),
      partnerPerformance,
      partnerFunds,
    }
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}
