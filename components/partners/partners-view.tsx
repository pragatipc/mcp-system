"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MoreVertical, Edit, Trash2, CreditCard, UserPlus, Filter, Download } from "lucide-react"

const partners = [
  {
    id: 1,
    name: "Amit Singh",
    initials: "AS",
    phone: "+91 98765 43210",
    email: "amit.singh@example.com",
    status: "active",
    orders: 45,
    completed: 42,
    walletBalance: 1240,
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Raj Kumar",
    initials: "RK",
    phone: "+91 87654 32109",
    email: "raj.kumar@example.com",
    status: "active",
    orders: 40,
    completed: 38,
    walletBalance: 980,
    joinDate: "2023-01-20",
  },
  {
    id: 3,
    name: "Priya Sharma",
    initials: "PS",
    phone: "+91 76543 21098",
    email: "priya.sharma@example.com",
    status: "active",
    orders: 38,
    completed: 32,
    walletBalance: 750,
    joinDate: "2023-02-05",
  },
  {
    id: 4,
    name: "Vikram Patel",
    initials: "VP",
    phone: "+91 65432 10987",
    email: "vikram.patel@example.com",
    status: "inactive",
    orders: 36,
    completed: 30,
    walletBalance: 620,
    joinDate: "2023-02-10",
  },
  {
    id: 5,
    name: "Neha Gupta",
    initials: "NG",
    phone: "+91 54321 09876",
    email: "neha.gupta@example.com",
    status: "active",
    orders: 40,
    completed: 35,
    walletBalance: 540,
    joinDate: "2023-02-15",
  },
]

export default function PartnersView() {
  const [showAddPartnerDialog, setShowAddPartnerDialog] = useState(false)
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false)
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null)

  const selectedPartner = partners.find((partner) => partner.id === selectedPartnerId)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pickup Partners</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={showAddPartnerDialog} onOpenChange={setShowAddPartnerDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Pickup Partner</DialogTitle>
                <DialogDescription>Add a new pickup partner to your network</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Full Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" placeholder="email@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="commission" className="text-right">
                    Commission
                  </Label>
                  <Input id="commission" placeholder="10%" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddPartnerDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddPartnerDialog(false)}>Add Partner</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
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
          <TabsTrigger value="all">All Partners</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{partner.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{partner.name}</div>
                            <div className="text-sm text-muted-foreground">{partner.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {partner.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{partner.orders}</TableCell>
                      <TableCell>{Math.round((partner.completed / partner.orders) * 100)}%</TableCell>
                      <TableCell>₹{partner.walletBalance}</TableCell>
                      <TableCell>
                        {new Date(partner.joinDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
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
                                setSelectedPartnerId(partner.id)
                                setShowAddFundsDialog(true)
                              }}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Add Funds
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Partner
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

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners
                    .filter((p) => p.status === "active")
                    .map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{partner.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{partner.name}</div>
                              <div className="text-sm text-muted-foreground">{partner.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </TableCell>
                        <TableCell>{partner.orders}</TableCell>
                        <TableCell>{Math.round((partner.completed / partner.orders) * 100)}%</TableCell>
                        <TableCell>₹{partner.walletBalance}</TableCell>
                        <TableCell>
                          {new Date(partner.joinDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
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
                                  setSelectedPartnerId(partner.id)
                                  setShowAddFundsDialog(true)
                                }}
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Add Funds
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Partner
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

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners
                    .filter((p) => p.status === "inactive")
                    .map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{partner.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{partner.name}</div>
                              <div className="text-sm text-muted-foreground">{partner.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            Inactive
                          </Badge>
                        </TableCell>
                        <TableCell>{partner.orders}</TableCell>
                        <TableCell>{Math.round((partner.completed / partner.orders) * 100)}%</TableCell>
                        <TableCell>₹{partner.walletBalance}</TableCell>
                        <TableCell>
                          {new Date(partner.joinDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
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
                                  setSelectedPartnerId(partner.id)
                                  setShowAddFundsDialog(true)
                                }}
                              >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Add Funds
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Partner
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

      <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Partner Wallet</DialogTitle>
            <DialogDescription>
              {selectedPartner ? `Add funds to ${selectedPartner.name}'s wallet` : "Add funds to partner wallet"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <Input id="amount" placeholder="500" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input id="notes" placeholder="Optional notes" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFundsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddFundsDialog(false)}>Add Funds</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
