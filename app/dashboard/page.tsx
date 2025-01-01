import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
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
async function DashboardOverview() {
  const session = await auth();
  const userId = session.userId;

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch user's data
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      vehicles: true,
      bookings: true,
      customers: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  // Calculate metrics from actual data
  const activeRentals = user.bookings.filter(
    (booking) =>
      new Date(booking.startDate) <= new Date() &&
      new Date(booking.endDate) >= new Date()
  ).length;

  const upcomingReservations = user.bookings.filter(
    (booking) => new Date(booking.startDate) > new Date()
  ).length;

  // Calculate revenue
  const calculateRevenue = (days: number) => {
    const now = new Date();
    const pastDate = new Date(now.setDate(now.getDate() - days));

    return user.bookings
      .filter((booking) => new Date(booking.createdAt) >= pastDate)
      .reduce((sum, booking) => sum + booking.totalAmount, 0);
  };

  const dailyRevenue = calculateRevenue(1);
  const weeklyRevenue = calculateRevenue(7);
  const monthlyRevenue = calculateRevenue(30);

  // Vehicle statistics
  const rentedVehicles = user.vehicles.filter(
    (v) => v.status === "Rented"
  ).length;
  const availableVehicles = user.vehicles.filter(
    (v) => v.status === "Available"
  ).length;
  const maintenanceVehicles = user.vehicles.filter(
    (v) => v.status === "Maintenance"
  ).length;

  const totalVehicles = user.vehicles.length;
  const utilizationRate = totalVehicles
    ? (rentedVehicles / totalVehicles) * 100
    : 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>

      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user.firstName || "User"}!</CardTitle>
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
            <Link href="/dashboard/fleet" passHref>
              <Button variant="outline" className="w-full justify-between">
                Fleet Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/bookings" passHref>
              <Button variant="outline" className="w-full justify-between">
                Booking Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/customers" passHref>
              <Button variant="outline" className="w-full justify-between">
                Customer Management
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/reports" passHref>
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
          {user.vehicles.some((v) => v.status === "Maintenance") && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Maintenance Required</AlertTitle>
              <AlertDescription>
                You have {maintenanceVehicles} vehicle(s) requiring maintenance.
              </AlertDescription>
            </Alert>
          )}

          {upcomingReservations > 0 && (
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertTitle>Upcoming Bookings</AlertTitle>
              <AlertDescription>
                You have {upcomingReservations} upcoming reservations.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardOverview;
