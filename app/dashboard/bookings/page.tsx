import { Calendar, Filter, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'

// Dummy data for bookings
const bookings = [
  { id: 'BK001', customerName: 'John Doe', vehicle: 'Toyota Camry (ABC123)', startDate: '2023-06-01', endDate: '2023-06-05', status: 'Confirmed', totalCost: '$250' },
  { id: 'BK002', customerName: 'Jane Smith', vehicle: 'Honda Civic (XYZ789)', startDate: '2023-06-03', endDate: '2023-06-07', status: 'Pending', totalCost: '$200' },
  { id: 'BK003', customerName: 'Bob Johnson', vehicle: 'Ford Mustang (DEF456)', startDate: '2023-06-05', endDate: '2023-06-10', status: 'In Progress', totalCost: '$400' },
  { id: 'BK004', customerName: 'Alice Brown', vehicle: 'Chevrolet Malibu (GHI789)', startDate: '2023-06-07', endDate: '2023-06-12', status: 'Confirmed', totalCost: '$300' },
  { id: 'BK005', customerName: 'Charlie Wilson', vehicle: 'Nissan Altima (JKL012)', startDate: '2023-06-10', endDate: '2023-06-15', status: 'Pending', totalCost: '$275' },
]

export default function BookingsDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Bookings Management Dashboard</h1>
      
      {/* Notifications and Alerts */}
      <Alert>
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>You have 2 pending bookings that need confirmation.</AlertDescription>
      </Alert>

      {/* Search and Filter Panel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input className="flex-grow" type="text" placeholder="Search bookings..." />
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" /> Calendar View
          </Button>
        </div>
      </div>

      {/* Add New Booking Button */}
      <Button asChild className="w-full sm:w-auto">
        <Link href='/dashboard/bookings/create' >
        <Plus className="mr-2 h-4 w-4" /> Add New Booking
        </Link>
      </Button>

      {/* Bookings List View */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>Manage your vehicle bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Booking ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Booking Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.vehicle}</TableCell>
                    <TableCell>{`${booking.startDate} - ${booking.endDate}`}</TableCell>
                    <TableCell>
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.totalCost}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Booking Details - {booking.id}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div>
                              <h3 className="font-semibold">Customer Information</h3>
                              <p>{booking.customerName}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Booking Details</h3>
                              <p>Vehicle: {booking.vehicle}</p>
                              <p>Dates: {booking.startDate} - {booking.endDate}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Payment Information</h3>
                              <p>Total Cost: {booking.totalCost}</p>
                              <p>Status: {booking.status}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Actions</h3>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm">Update Status</Button>
                                <Button size="sm" variant="outline">Edit Booking</Button>
                                <Button size="sm" variant="destructive">Cancel Booking</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}