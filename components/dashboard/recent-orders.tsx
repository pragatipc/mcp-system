"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Rahul Mehta",
    partner: "Amit Singh",
    amount: 120,
    status: "completed",
    date: "2023-04-11T10:30:00",
  },
  {
    id: "ORD-002",
    customer: "Priya Sharma",
    partner: "Raj Kumar",
    amount: 85,
    status: "in-progress",
    date: "2023-04-11T09:15:00",
  },
  {
    id: "ORD-003",
    customer: "Vikram Patel",
    partner: "Neha Gupta",
    amount: 150,
    status: "pending",
    date: "2023-04-11T08:45:00",
  },
  {
    id: "ORD-004",
    customer: "Ananya Singh",
    partner: "Vikram Patel",
    amount: 95,
    status: "completed",
    date: "2023-04-10T16:20:00",
  },
  {
    id: "ORD-005",
    customer: "Karan Malhotra",
    partner: "Priya Sharma",
    amount: 110,
    status: "in-progress",
    date: "2023-04-10T14:50:00",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Partner</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.partner}</TableCell>
            <TableCell>₹{order.amount}</TableCell>
            <TableCell>
              {order.status === "completed" && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              )}
              {order.status === "in-progress" && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                  <Clock className="mr-1 h-3 w-3" />
                  In Progress
                </Badge>
              )}
              {order.status === "pending" && (
                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Pending
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              {new Date(order.date).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
