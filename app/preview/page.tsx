"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  Car,
  Calendar,
  DollarSign,
  Wrench,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function DashboardOverview() {
  const activeRentals = 42;
  const upcomingReservations = 15;
  const dailyRevenue = 3;
  const weeklyRevenue = 22800;
  const monthlyRevenue = 97500;
  const rentedVehicles = 42;
  const availableVehicles = 28;
  const maintenanceVehicles = 5;

  const totalVehicles =
    rentedVehicles + availableVehicles + maintenanceVehicles;
  const utilizationRate = (rentedVehicles / totalVehicles) * 100;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Booking",
      message: "Reservation #4872 has been confirmed",
      time: "5 minutes ago",
      type: "info",
    },
    {
      id: 2,
      title: "Maintenance Alert",
      message: "Vehicle BHM2023 is due for oil change",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Return Completed",
      message: "Vehicle BHM2025 has been returned successfully",
      time: "2 hours ago",
      type: "success",
    },
  ];

  const handleQuickAccessClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFeatureModal(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button variant="outline" onClick={() => setShowNotifications(true)}>
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>

      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, John!</CardTitle>
          <CardDescription>
            Here&apos;s an overview of your rental business today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Rentals
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRentals}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Reservations
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingReservations}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Maintainence Reminders
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dailyRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Utilization Rate
                </CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {utilizationRate.toFixed(1)}%
                </div>
                <Progress value={utilizationRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" className="space-y-4">
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Daily Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${dailyRevenue.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Weekly Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${weeklyRevenue.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${monthlyRevenue.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="fleet" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Rented Vehicles
                    </CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rentedVehicles}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Vehicles
                    </CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {availableVehicles}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Vehicles in Maintenance
                    </CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {maintenanceVehicles}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/fleet"
              passHref
              onClick={handleQuickAccessClick}
            >
              <Button variant="outline" className="w-full justify-between">
                Fleet Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/dashboard/bookings"
              passHref
              onClick={handleQuickAccessClick}
            >
              <Button variant="outline" className="w-full justify-between">
                Booking Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/dashboard/customers"
              passHref
              onClick={handleQuickAccessClick}
            >
              <Button variant="outline" className="w-full justify-between">
                Customer Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/dashboard/reports"
              passHref
              onClick={handleQuickAccessClick}
            >
              <Button variant="outline" className="w-full justify-between">
                Reports & Analytics
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Notifications and Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications & Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Maintenance Required</AlertTitle>
            <AlertDescription>
              Vehicle BHM2023 is due for scheduled maintenance. Please schedule
              service as soon as possible.
            </AlertDescription>
          </Alert>
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>New Booking</AlertTitle>
            <AlertDescription>
              A new booking has been made for tomorrow. Vehicle: Toyota Camry
              (BHM2024).
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Payment Failure</AlertTitle>
            <AlertDescription>
              Payment for booking #12345 has failed. Please contact the customer
              to resolve the issue.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {notification.title}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {notification.message}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFeatureModal} onOpenChange={setShowFeatureModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Coming Soon!</DialogTitle>
            <DialogDescription className="pt-4 text-center">
              This feature isn&apos;t ready yet but will be available when the
              product launches. Join our waitlist to be the first to know when
              it&apos;s ready!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button className="font-bold" onClick={() => (window.location.href = "/")}>
              Join our Waitlist
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
