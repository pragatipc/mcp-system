"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, CreditCard, DollarSign, Package, Users, CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { PartnerPerformance } from "@/components/dashboard/partner-performance"
import { getDashboardData } from "@/actions/dashboard-actions"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addFundsToWallet } from "@/actions/wallet-actions"
import { toast } from "@/components/ui/use-toast"

export default function DashboardView() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState({
    walletBalance: 0,
    activePartnersCount: 0,
    totalOrdersCount: 0,
    completedOrdersCount: 0,
    inProgressOrdersCount: 0,
    pendingOrdersCount: 0,
    completionRate: 0,
    recentOrders: [],
    partnerPerformance: [],
    partnerFunds: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddFunds = async (formData) => {
    try {
      const result = await addFundsToWallet(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setShowAddFundsDialog(false)

        // Refresh dashboard data
        const data = await getDashboardData()
        setDashboardData(data)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funds",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
            <DialogTrigger asChild>
              <Button>
                <DollarSign className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Funds to Wallet</DialogTitle>
                <DialogDescription>Add funds to your MCP wallet</DialogDescription>
              </DialogHeader>
              <form action={handleAddFunds}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount (₹)
                    </Label>
                    <Input id="amount" name="amount" placeholder="1000" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Payment Method</Label>
                    <RadioGroup defaultValue="upi" name="paymentMethod" className="col-span-3">
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
                  <Button variant="outline" onClick={() => setShowAddFundsDialog(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Add Funds</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{dashboardData.walletBalance.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Manage your funds</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.activePartnersCount}</div>
                <p className="text-xs text-muted-foreground">
                  <Button variant="link" className="h-auto p-0 text-xs" onClick={() => router.push("/partners")}>
                    View all partners
                  </Button>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalOrdersCount}</div>
                <p className="text-xs text-muted-foreground">
                  <Button variant="link" className="h-auto p-0 text-xs" onClick={() => router.push("/orders")}>
                    Manage orders
                  </Button>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.completionRate}%</div>
                <p className="text-xs text-muted-foreground">Overall order completion</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Overview of all orders across partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                      <span className="ml-auto text-sm">{dashboardData.completedOrdersCount}</span>
                    </div>
                    <Progress
                      value={
                        dashboardData.totalOrdersCount > 0
                          ? (dashboardData.completedOrdersCount / dashboardData.totalOrdersCount) * 100
                          : 0
                      }
                      className="h-2 bg-green-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span>In Progress</span>
                      </div>
                      <span className="ml-auto text-sm">{dashboardData.inProgressOrdersCount}</span>
                    </div>
                    <Progress
                      value={
                        dashboardData.totalOrdersCount > 0
                          ? (dashboardData.inProgressOrdersCount / dashboardData.totalOrdersCount) * 100
                          : 0
                      }
                      className="h-2 bg-yellow-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span>Pending</span>
                      </div>
                      <span className="ml-auto text-sm">{dashboardData.pendingOrdersCount}</span>
                    </div>
                    <Progress
                      value={
                        dashboardData.totalOrdersCount > 0
                          ? (dashboardData.pendingOrdersCount / dashboardData.totalOrdersCount) * 100
                          : 0
                      }
                      className="h-2 bg-red-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Partner Funds</CardTitle>
                <CardDescription>Wallet balance distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.partnerFunds &&
                    dashboardData.partnerFunds.map((partner, index) => (
                      <div key={index} className="flex items-center">
                        <div className="font-medium">{partner.name}</div>
                        <div className="ml-auto">₹{partner.walletBalance}</div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm" onClick={() => router.push("/partners")}>
                    View All Partners
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders across all partners</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Partner Performance</CardTitle>
                <CardDescription>Top performing pickup partners</CardDescription>
              </CardHeader>
              <CardContent>
                <PartnerPerformance />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
