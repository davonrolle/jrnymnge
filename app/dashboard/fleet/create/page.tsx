"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'

import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'


export default function AddNewVehicle() {

  const { toast } = useToast()
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the vehicle data to your backend
    // For now, we'll just simulate a successful addition
    toast({
      title: "Vehicle Added",
      description: "The new vehicle has been successfully added to your fleet.",
    })
    router.push('/dashboard/fleet')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/fleet">
            <ChevronLeft className="h-4 w-4" />
            Back to Fleet
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold">Add New Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Basic Information</CardTitle>
            <CardDescription>Enter the basic details of the vehicle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Vehicle Make</Label>
                <Select required>
                  <SelectTrigger id="make">
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    {/* Add more makes as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Vehicle Model</Label>
                <Input id="model" placeholder="Enter model" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="Enter year" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input id="vin" placeholder="Enter VIN" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
            <CardDescription>Enter the vehicle specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engine">Engine Type</Label>
                <Select required>
                  <SelectTrigger id="engine">
                    <SelectValue placeholder="Select engine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v6">V6</SelectItem>
                    <SelectItem value="v8">V8</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    {/* Add more engine types as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select required>
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select required>
                  <SelectTrigger id="fuel">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    {/* Add more fuel types as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input id="mileage" type="number" placeholder="Enter mileage" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rental Information</CardTitle>
            <CardDescription>Enter rental-specific details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Daily Rental Rate ($)</Label>
                <Input id="rate" type="number" placeholder="Enter daily rate" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Availability Status</Label>
                <Select required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="out-of-service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seats">Seating Capacity</Label>
                <Input id="seats" type="number" placeholder="Enter seating capacity" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="Enter vehicle color" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Features and Add-ons</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Air Conditioning', 'GPS', 'Bluetooth', 'Backup Camera', 'Sunroof', 'Leather Seats'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox id={feature.toLowerCase().replace(' ', '-')} />
                    <Label htmlFor={feature.toLowerCase().replace(' ', '-')}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Images</CardTitle>
            <CardDescription>Upload images of the vehicle (max 5 images)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                id="vehicle-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-video">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Vehicle image ${index + 1}`}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Enter any additional details or notes about the vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Enter any additional information, service history, or notes about the vehicle" />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">Add Vehicle to Fleet</Button>
      </form>
    </div>
  )
}