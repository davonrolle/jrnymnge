"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Booking = {
  id: string;
  customerId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: string;
  totalAmount: number;
  pickupLocation: string;
  dropoffLocation: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  specialRequests?: string;
  insurance?: string;
  mileagePolicy?: string;
  fuelPolicy?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  vehicle?: {
    make: string;
    model: string;
    year: number;
  };
  tempFirstName?: string;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Booking>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isSignedIn, isLoaded, userId } = useAuth();

  const fetchBookingsForUser = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!userId) {
        throw new Error("User not signed in");
      }
      const response = await fetch(`/api/bookings?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data: Booking[] = await response.json();
      setBookings(data);
    } catch {
      // Handle error if necessary
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchBookingsForUser();
    }
  }, [isSignedIn, userId, fetchBookingsForUser]);

  const handleSort = (field: keyof Booking) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    `${booking.customer?.firstName || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${booking.vehicle?.make || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${booking.vehicle?.model || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${booking.status || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBookings = filteredBookings.sort((a, b) => {
    const aValue = a[sortField] ?? "";
    const bValue = b[sortField] ?? "";
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>Manage your vehicle bookings</CardDescription>
        <div className="mt-4">
          <Link href="/dashboard/bookings/create">
            <Button variant="default">Create New Booking</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center">No bookings found</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("startDate")} className="cursor-pointer">
                    Start Date {sortField === "startDate" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                    Status {sortField === "status" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </TableHead>
                  <TableHead onClick={() => handleSort("totalAmount")} className="cursor-pointer">
                    Total Amount {sortField === "totalAmount" && (sortDirection === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      {booking.startDate ? format(new Date(booking.startDate), "MMM dd, yyyy") : "N/A"}
                    </TableCell>
                    <TableCell>
                      {booking.customer 
                        ? `${booking.customer.firstName} ${booking.customer.lastName}`
                        : `${booking.tempFirstName || "Guest"}`}
                    </TableCell>
                    <TableCell>
                      {booking.vehicle 
                        ? `${booking.vehicle.year} ${booking.vehicle.make} ${booking.vehicle.model}` 
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "Confirmed"
                            ? "default"
                            : booking.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${booking.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/bookings/${booking.id}`}>
                        <Button variant="link">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(sortedBookings.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}