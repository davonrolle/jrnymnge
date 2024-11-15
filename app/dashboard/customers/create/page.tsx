"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronLeft, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

export default function AddNewCustomer() {
  const router = useRouter();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [licenseExpiry, setLicenseExpiry] = useState<Date>();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the customer data to your backend
    // For now, we'll just simulate a successful addition
    setNotification({
      message: "The new customer has been successfully added to your system.",
      type: "success",
    });
    setTimeout(() => {
      router.push("/dashboard/customers");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white flex items-center justify-between`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/customers">
            <ChevronLeft className="h-4 w-4" />
            Back to Customers
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold">Add New Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the customer&apos;s basic details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter full name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={!dateOfBirth ? "text-muted-foreground" : ""}
                    >
                      {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={setDateOfBirth}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="Street address" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="City" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" placeholder="State/Province" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input id="zip" placeholder="ZIP/Postal Code" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select required>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Identification and License Information</CardTitle>
            <CardDescription>
              Enter the customer&apos;s identification details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Driver&apos;s License Number</Label>
                <Input
                  id="licenseNumber"
                  placeholder="Enter license number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>License Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={!licenseExpiry ? "text-muted-foreground" : ""}
                    >
                      {licenseExpiry
                        ? format(licenseExpiry, "PPP")
                        : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={licenseExpiry}
                      onSelect={setLicenseExpiry}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseUpload">Upload License Document</Label>
              <Input id="licenseUpload" type="file" accept="image/*,.pdf" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">Additional Identification Number</Label>
              <Input
                id="idNumber"
                placeholder="Passport or national ID number"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rental Preferences</CardTitle>
            <CardDescription>
              Specify the customer&apos;s rental preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferredVehicle">Preferred Vehicle Type</Label>
              <Select>
                <SelectTrigger id="preferredVehicle">
                  <SelectValue placeholder="Select preferred vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Additional Options</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Child Seat", "GPS", "Wi-Fi", "Additional Driver"].map(
                  (option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={option.toLowerCase().replace(" ", "-")} />
                      <Label htmlFor={option.toLowerCase().replace(" ", "-")}>
                        {option}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Enter the customer&apos;s payment details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
              <Select>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit Card</SelectItem>
                  <SelectItem value="debit">Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="Enter card number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Card Expiry</Label>
                <Input id="cardExpiry" placeholder="MM/YY" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Textarea
                id="billingAddress"
                placeholder="Enter billing address if different from primary address"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>
              Add any additional information about the customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Enter any additional notes, preferences, or special instructions" />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/customers")}
          >
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </div>
  );
}
