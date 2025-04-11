"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical, Filter, Download, CheckCircle, Clock, AlertCircle, Eye, UserCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const orders = [
  {
    id: "ORD-001",
    customer: "Rahul Mehta",
    partner: "Amit Singh",
    amount: 120,
    status: "completed",
    date: "2023-04-11T10:30:00",
    address: "123 Main St, Mumbai, MH 400001",
  },
  {
    id: "ORD-002",
    customer: "Priya Sharma",
    partner: "Raj Kumar",
    amount: 85,
    status: "in-progress",
    date: "2023-04-11T09:15:00",
    address: "456 Park Ave, Delhi, DL 110001",
  },
  {
    id: "ORD-003",
    customer: "Vikram Patel",
    partner: "Neha Gupta",
    amount: 150,
    status: "pending",
    date: "2023-04-11T08:45:00",
    address: "789 Oak Rd, Bangalore, KA 560001",
  },
  {
    id: "ORD-004",
    customer: "Ananya Singh",
    partner: "Vikram Patel",
    amount: 95,
    status: "completed",
    date: "2023-04-10T16:20:00",
    address: "321 Pine St, Chennai, TN 600001",
  },
  {
    id: "ORD-005",
    customer: "Karan Malhotra",
    partner: "Priya Sharma",
    amount: 110,
    status: "in-progress",
    date: "2023-04-10T14:50:00",
    address: "654 Elm Blvd, Hyderabad, TS 500001",
  },
  {
    id: "ORD-006",
    customer: "Neha Reddy",
    partner: "Amit Singh",
    amount: 75,
    status: "pending",
    date: "2023-04-10T13:25:00",
    address: "987 Cedar Ln, Pune, MH 411001",
  },
  {
    id: "ORD-007",
    customer: "Arjun Nair",
    partner: "Raj Kumar",
    amount: 130,
    status: "completed",
    date: "2023-04-09T15:40:00",
    address: "246 Maple Dr, Kolkata, WB 700001",
  },
  {
    id: "ORD-008",
    customer: "Meera Joshi",
    partner: "Neha Gupta",
    amount: 105,
    status: "in-progress",
    date: "2023-04-09T14:10:00",
    address: "135 Birch Ct, Ahmedabad, GJ 380001",
  },
]

const partners = [
  { id: 1, name: "Amit Singh" },
  { id: 2, name: "Raj Kumar" },
  { id: 3, name: "Priya Sharma" },
  { id: 4, name: "Vikram Patel" },
  { id: 5, name: "Neha Gupta" },
]

export default function OrdersView() {
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showOrderDetailsDialog, setShowOrderDetailsDialog] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const selectedOrder = orders.find((order) => order.id === selectedOrderId)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <Button>Auto-Assign Orders</Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.partner || "Unassigned"}</TableCell>
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
                      <TableCell>
                        {new Date(order.date).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrderId(order.id)
                                setShowOrderDetailsDialog(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrderId(order.id)
                                setShowAssignDialog(true)
                              }}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Assign Partner
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter((o) => o.status === "pending")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.partner || "Unassigned"}</TableCell>
                        <TableCell>₹{order.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrderId(order.id)
                                  setShowOrderDetailsDialog(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrderId(order.id)
                                  setShowAssignDialog(true)
                                }}
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assign Partner
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter((o) => o.status === "in-progress")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.partner || "Unassigned"}</TableCell>
                        <TableCell>₹{order.amount}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock className="mr-1 h-3 w-3" />
                            In Progress
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrderId(order.id)
                                  setShowOrderDetailsDialog(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrderId(order.id)
                                  setShowAssignDialog(true)
                                }}
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Assign Partner
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders
                    .filter((o) => o.status === "completed")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.partner || "Unassigned"}</TableCell>
                        <TableCell>₹{order.amount}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedOrderId(order.id)
                                  setShowOrderDetailsDialog(true)
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Partner to Order</DialogTitle>
            <DialogDescription>
              {selectedOrder
                ? `Assign a pickup partner to order ${selectedOrder.id}`
                : "Assign a pickup partner to this order"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partner" className="text-right">
                Partner
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a partner" />
                </SelectTrigger>
                <SelectContent>
                  {partners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id.toString()}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input id="notes" placeholder="Optional notes" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAssignDialog(false)}>Assign Partner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderDetailsDialog} onOpenChange={setShowOrderDetailsDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder ? `Details for order ${selectedOrder.id}` : "Order details"}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Order ID:</Label>
                <div className="col-span-2">{selectedOrder.id}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Customer:</Label>
                <div className="col-span-2">{selectedOrder.customer}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Address:</Label>
                <div className="col-span-2">{selectedOrder.address}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Amount:</Label>
                <div className="col-span-2">₹{selectedOrder.amount}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Partner:</Label>
                <div className="col-span-2">{selectedOrder.partner || "Unassigned"}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Status:</Label>
                <div className="col-span-2">
                  {selectedOrder.status === "completed" && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  )}
                  {selectedOrder.status === "in-progress" && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      <Clock className="mr-1 h-3 w-3" />
                      In Progress
                    </Badge>
                  )}
                  {selectedOrder.status === "pending" && (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-right font-medium">Date:</Label>
                <div className="col-span-2">
                  {new Date(selectedOrder.date).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowOrderDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
