'use client'

import { useState } from 'react'
import { Calendar, Car, DollarSign, FileText, MessageSquare, Plus, Settings, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen overflow-hidden dark:bg-stone-900">
      {/* Sidebar */}
      <aside className="hidden w-64 overflow-y-auto dark:bg-stone-900 md:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center h-16">
            <span className="dark:text-white font-bold text-lg">JRNY PRO</span>
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-stone-950 text-white">
              <Calendar className="mr-3 h-6 w-6" />
              Dashboard
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-stone-700 hover:text-white">
              <Calendar className="mr-3 h-6 w-6" />
              Bookings
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-stone-300 hover:bg-stone-700 hover:text-white">
              <Car className="mr-3 h-6 w-6" />
              Fleet
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-stone-300 hover:bg-stone-700 hover:text-white">
              <Users className="mr-3 h-6 w-6" />
              Customers
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-stone-300 hover:bg-stone-700 hover:text-white">
              <DollarSign className="mr-3 h-6 w-6" />
              Finances
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-stone-300 hover:bg-stone-700 hover:text-white">
              <FileText className="mr-3 h-6 w-6" />
              Reports
            </Link>
            <Link href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-stone-300 hover:bg-stone-700 hover:text-white">
              <Settings className="mr-3 h-6 w-6" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <header className="shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <div className="flex items-center">
                <Button variant="outline" className="mr-4">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
                
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-stone-700 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Vehicles</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">-2 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 since last hour</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="fleet">Fleet</TabsTrigger>
                <TabsTrigger value="finances">Finances</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center">
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                  New booking: Toyota Camry (ABC123)
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  2 hours ago
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          New Booking
                        </Button>
                        <Button className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Vehicle
                        </Button>
                        <Button className="w-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="bookings">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>
                      A list of your upcoming bookings for the next 7 days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                John Doe - Toyota Camry (ABC123)
                              </p>
                              <p className="text-sm text-muted-foreground">
                                May 15, 2023 - May 20, 2023
                              </p>
                            </div>
                            <Button variant="outline">View Details</Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fleet">
                <Card>
                  <CardHeader>
                    <CardTitle>Fleet Status</CardTitle>
                    <CardDescription>
                      An overview of your current fleet status.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                Toyota Camry (ABC123)
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Status: Available
                              </p>
                            </div>
                            <Button variant="outline">Update Status</Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="finances">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>
                      Your financial summary for the current month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Total Revenue</p>
                        <p className="text-sm font-bold">$45,231.89</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Pending Payments</p>
                        <p className="text-sm font-bold">$3,450.00</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Expenses</p>
                        <p className="text-sm font-bold">$12,345.67</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}