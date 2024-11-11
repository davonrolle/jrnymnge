import { BarChart, Calendar, Download, LineChart, Mail, PieChart, Printer } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dummy data for reports
const overviewMetrics = {
  totalRevenue: '$125,000',
  activeBookings: 42,
  completedBookings: 156,
  customerCount: 230,
  vehicleUtilizationRate: '78%'
}

const topPerformingVehicles = [
  { id: 1, name: 'Toyota Camry', revenue: '$12,500', rentalCount: 25, avgDuration: '3.5 days' },
  { id: 2, name: 'Honda CR-V', revenue: '$11,000', rentalCount: 20, avgDuration: '4 days' },
  { id: 3, name: 'Ford Mustang', revenue: '$10,500', rentalCount: 15, avgDuration: '2.5 days' },
]

const topCustomers = [
  { id: 1, name: 'John Doe', revenue: '$5,000', bookings: 10 },
  { id: 2, name: 'Jane Smith', revenue: '$4,500', bookings: 8 },
  { id: 3, name: 'Bob Johnson', revenue: '$4,000', bookings: 7 },
]

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Reports Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Date
          </Button>
        </div>
      </div>

      {/* Overview Dashboard */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeBookings}</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Bookings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.completedBookings}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Utilization Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.vehicleUtilizationRate}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            {/* Placeholder for revenue graph */}
            <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
              <LineChart className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Revenue graph would be displayed here</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trends">Booking Trends</TabsTrigger>
              <TabsTrigger value="status">Booking Status</TabsTrigger>
              <TabsTrigger value="duration">Average Duration</TabsTrigger>
            </TabsList>
            <TabsContent value="trends">
              <div className="h-[300px] w-full">
                {/* Placeholder for booking trends graph */}
                <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Booking trends graph would be displayed here</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="status">
              <div className="h-[300px] w-full">
                {/* Placeholder for booking status breakdown */}
                <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Booking status breakdown would be displayed here</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="duration">
              <div className="text-center p-4">
                <h3 className="text-2xl font-bold">3.5 days</h3>
                <p className="text-muted-foreground">Average Booking Duration</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Top Performing Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rental Count</TableHead>
                  <TableHead>Avg. Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPerformingVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.name}</TableCell>
                    <TableCell>{vehicle.revenue}</TableCell>
                    <TableCell>{vehicle.rentalCount}</TableCell>
                    <TableCell>{vehicle.avgDuration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New vs Returning Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              {/* Placeholder for new vs returning customers chart */}
              <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
                <PieChart className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">New vs Returning chart would be displayed here</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <h3 className="text-4xl font-bold">75%</h3>
              <p className="text-muted-foreground">Customer Retention Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Customers by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Bookings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.revenue}</TableCell>
                    <TableCell>{customer.bookings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Export and Download Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export and Download Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Automated Report Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Report Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Schedule Weekly Report
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Schedule Monthly Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}