"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  dailyRate: number;
  status: string;
};

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default function CreateBookingPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const router = useRouter();

  // Fetch both vehicles and customers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesResponse, customersResponse] = await Promise.all([
          fetch("/api/vehicles"),
          fetch("/api/customers"),
        ]);

        const vehiclesData: Vehicle[] = await vehiclesResponse.json();
        const customersData: Customer[] = await customersResponse.json();

        setVehicles(vehiclesData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Auto-fill customer details when selected
  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setPhone(customer.phone || "");
    }
  };

  // Calculate the total amount based on dates and selected vehicle
  useEffect(() => {
    if (startDate && endDate && selectedVehicle) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const days =
          Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
          1;
        setTotalAmount(days * selectedVehicle.dailyRate);
      } else {
        setTotalAmount(0);
      }
    } else {
      setTotalAmount(0);
    }
  }, [startDate, endDate, selectedVehicle]);

  // Add auth check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!selectedVehicle) {
      alert("Please select a vehicle");
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingData = {
        tempName: `${firstName} ${lastName}`.trim(),
        tempEmail: email,
        tempPhone: phone,
        vehicleId: selectedVehicle.id,
        vehicleBooked: `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.year})`,
        startDate,
        endDate,
        totalAmount,
        pickupLocation: "Default Location",
        dropoffLocation: "Default Location",
        specialRequests: "",
        insurance: "Basic",
        mileagePolicy: "Standard",
        fuelPolicy: "Full to Full",
        ...(selectedCustomer && { customerId: selectedCustomer.id }),
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create booking.");
      }

      router.push("/dashboard/bookings");
      router.refresh(); // Add this to refresh the bookings list
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Could not create booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add loading state
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6 text-white">
      <Card>
        <CardHeader>
          <CardTitle>Create New Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customer" className="block text-sm font-medium">
                Select Existing Customer (Optional)
              </label>
              <Select onValueChange={handleCustomerSelect}>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName} ({customer.email}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="For booking confirmation and receipts"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="For booking-related communications"
              />
            </div>
            <div>
              <label htmlFor="vehicle" className="block text-sm font-medium">
                Vehicle
              </label>
              <Select
                onValueChange={(id) =>
                  setSelectedVehicle(vehicles.find((v) => v.id === id) || null)
                }
              >
                <SelectTrigger id="vehicle">
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles
                    .filter((vehicle) => vehicle.status === "Available")
                    .map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.make} {vehicle.model} ({vehicle.year}) - $
                        {vehicle.dailyRate}/day
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">
                Pickup Date
              </label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">
                Return Date
              </label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="totalAmount"
                className="block text-sm font-medium"
              >
                Total Amount
              </label>
              <Input
                id="totalAmount"
                type="text"
                value={`$${totalAmount}`}
                readOnly
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
