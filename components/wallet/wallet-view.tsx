"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet,
  DollarSign,
  BanknoteIcon as BankIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const transactions = [
  {
    id: "TRX-001",
    type: "deposit",
    amount: 5000,
    description: "Added funds via UPI",
    date: "2023-04-11T10:30:00",
    status: "completed",
  },
  {
    id: "TRX-002",
    type: "transfer",
    amount: 1000,
    description: "Transfer to Amit Singh",
    date: "2023-04-10T15:45:00",
    status: "completed",
  },
  {
    id: "TRX-003",
    type: "transfer",
    amount: 800,
    description: "Transfer to Raj Kumar",
    date: "2023-04-09T14:20:00",
    status: "completed",
  },
  {
    id: "TRX-004",
    type: "deposit",
    amount: 2000,
    description: "Added funds via Bank Transfer",
    date: "2023-04-08T11:10:00",
    status: "completed",
  },
  {
    id: "TRX-005",
    type: "withdrawal",
    amount: 1500,
    description: "Withdrawal to Bank Account",
    date: "2023-04-07T16:30:00",
    status: "completed",
  },
  {
    id: "TRX-006",
    type: "transfer",
    amount: 600,
    description: "Transfer to Neha Gupta",
    date: "2023-04-06T13:15:00",
    status: "completed",
  },
  {
    id: "TRX-007",
    type: "transfer",
    amount: 750,
    description: "Transfer to Priya Sharma",
    date: "2023-04-05T09:45:00",
    status: "completed",
  },
  {
    id: "TRX-008",
    type: "deposit",
    amount: 3000,
    description: "Added funds via UPI",
    date: "2023-04-04T10:20:00",
    status: "completed",
  },
]

const partners = [
  { id: 1, name: "Amit Singh", walletBalance: 1240 },
  { id: 2, name: "Raj Kumar", walletBalance: 980 },
  { id: 3, name: "Priya Sharma", walletBalance: 750 },
  { id: 4, name: "Vikram Patel", walletBalance: 620 },
  { id: 5, name: "Neha Gupta", walletBalance: 540 },
]

export default function WalletView() {
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [walletBalance, setWalletBalance] = useState(5280)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Wallet & Transactions</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Funds to Wallet</DialogTitle>
                <DialogDescription>Add funds to your MCP wallet</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount (₹)
                  </Label>
                  <Input id="amount" placeholder="1000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Payment Method</Label>
                  <RadioGroup defaultValue="upi" className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddFundsDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddFundsDialog(false)}>Proceed to Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Funds to Partner</DialogTitle>
                <DialogDescription>Transfer funds to a pickup partner's wallet</DialogDescription>
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
                <Button variant="outline" onClick={() => setShowTransferDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowTransferDialog(false)}>Transfer Funds</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>Withdraw funds from your MCP wallet to your bank account</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount (₹)
                  </Label>
                  <Input id="amount" placeholder="1000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bank" className="text-right">
                    Bank Account
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank - XXXX1234</SelectItem>
                      <SelectItem value="sbi">SBI - XXXX5678</SelectItem>
                      <SelectItem value="icici">ICICI Bank - XXXX9012</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowWithdrawDialog(false)}>Withdraw Funds</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{walletBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+₹1,200 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹10,000</div>
            <p className="text-xs text-muted-foreground">+₹3,000 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,150</div>
            <p className="text-xs text-muted-foreground">+₹750 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <BankIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,500</div>
            <p className="text-xs text-muted-foreground">+₹0 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="partner-wallets">Partner Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your wallet transactions</CardDescription>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        {transaction.type === "deposit" && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <ArrowDownLeft className="mr-1 h-3 w-3" />
                            Deposit
                          </Badge>
                        )}
                        {transaction.type === "transfer" && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            Transfer
                          </Badge>
                        )}
                        {transaction.type === "withdrawal" && (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                            <BankIcon className="mr-1 h-3 w-3" />
                            Withdrawal
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {transaction.type === "deposit" ? (
                          <span className="text-green-600">+₹{transaction.amount}</span>
                        ) : (
                          <span className="text-red-600">-₹{transaction.amount}</span>
                        )}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partner-wallets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Partner Wallet Balances</CardTitle>
              <CardDescription>View and manage your pickup partners' wallet balances</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner Name</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Last Transaction</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>₹{partner.walletBalance}</TableCell>
                      <TableCell>
                        {new Date().toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setShowTransferDialog(true)
                          }}
                        >
                          <CreditCard className="mr-1 h-3 w-3" />
                          Add Funds
                        </Button>
                        <Button variant="outline" size="sm">
                          <DollarSign className="mr-1 h-3 w-3" />
                          View Transactions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
