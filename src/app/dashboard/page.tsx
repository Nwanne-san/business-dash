"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/users-table"
import { SalesTable } from "@/components/sales-table"
import { UserMetrics } from "@/components/user-metrics"
import { SalesMetrics } from "@/components/sales-metrics"
import { CategoryDistribution } from "@/components/category-distribution"
import { SalesTrend } from "@/components/sales-trend"
import { UserGrowth } from "@/components/user-growth"
import { Activity, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
  const { isAuthenticated, keepLoggedIn } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!isAuthenticated || keepLoggedIn) return

    let inactivityTimer: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        // Logout user after 1 minute of inactivity
        router.push("/login")
      }, 60000) 
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
    events.forEach((event) => {
      document.addEventListener(event, resetTimer)
    })

    resetTimer()

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer)
      })
      clearTimeout(inactivityTimer)
    }
  }, [isAuthenticated, keepLoggedIn, router])

  if (!isAuthenticated) {
    return null // Don't render anything while checking authentication
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,853</div>
                  <p className="text-xs text-muted-foreground">+18.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">432</div>
                  <p className="text-xs text-muted-foreground">+4.3% from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Monthly sales performance for the current year</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SalesTrend />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations by month</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <UserGrowth />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Sales distribution by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryDistribution />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Latest transactions across all channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesTable limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Metrics</CardTitle>
                <CardDescription>Key user engagement and growth metrics</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UserMetrics />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Data</CardTitle>
                <CardDescription>Detailed information about registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <UsersTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Metrics</CardTitle>
                <CardDescription>Key sales performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesMetrics />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Data</CardTitle>
                <CardDescription>Detailed information about sales transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

