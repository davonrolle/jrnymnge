"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft } from "lucide-react"

export default function CreateNewBooking() {
  const router = useRouter()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [insurance, setInsurance] = useState(false)
  const [gps, setGps] = useState(false)
  const [childSeat, setChildSeat] = useState(false)

  const vehicles = [
    { id: "1", name: "Toyota Camry", year: 2022, price: 50 },
    { id: "2", name: "Honda CR-V", year: 2021, price: 60 },
    { id: "3", name: "Ford Mustang", year: 2023, price: 80 },
  ]

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedVehicle) return 0
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    const vehicle = vehicles.find(v => v.id === selectedVehicle)
    let total = vehicle ? vehicle.price * days : 0
    if (insurance) total += 15 * days
    if (gps) total += 5 * days
    if (childSeat) total += 10 * days
    return total
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the booking data to your backend
    console.log("Booking submitted")
    router.push('/bookings')
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/bookings">
            <ChevronLeft className="h-4 w-4" />
            Back to Bookings
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold">Create New Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Booking Information</CardTitle>
            <CardDescription>Enter the customer and booking details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" placeholder="Full Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={!startDate ? "text-muted-foreground" : ""}>
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={!endDate ? "text-muted-foreground" : ""}>
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Selection</CardTitle>
            <CardDescription>Choose a vehicle for the booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setSelectedVehicle} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.year}) - ${vehicle.price}/day
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
            <CardDescription>Select any additional services for the booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance" checked={insurance} onCheckedChange={(checked) => setInsurance(checked as boolean)} />
              <Label htmlFor="insurance">Insurance ($15/day)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gps" checked={gps} onCheckedChange={(checked) => setGps(checked as boolean)} />
              <Label htmlFor="gps">GPS Navigation ($5/day)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="childSeat" checked={childSeat} onCheckedChange={(checked) => setChildSeat(checked as boolean)} />
              <Label htmlFor="childSeat">Child Seat ($10/day)</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Instructions</CardTitle>
            <CardDescription>Add any additional notes or requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Enter any special instructions or requests here" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Total Price:</strong> ${calculateTotalPrice()}</p>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Confirm Booking</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}