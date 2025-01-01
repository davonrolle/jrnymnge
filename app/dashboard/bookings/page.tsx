"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Loader2, Pencil, Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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
  tempName?: string;
  tempEmail?: string;
  tempPhone?: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  vehicle?: {
    make: string;
    model: string;
    year: number;
    dailyRate: number;
  };
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Booking>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isSignedIn, isLoaded } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editFormData, setEditFormData] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    specialRequests: "",
    insurance: "",
    mileagePolicy: "",
    fuelPolicy: "",
    totalAmount: 0,
    status: "",
    dailyRate: 0,
  });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const calculateTotalAmount = useCallback(
    (startDate: string, endDate: string, dailyRate: number) => {
      if (!startDate || !endDate || !dailyRate) return 0;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const days =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1;
      return days * dailyRate;
    },
    []
  );

  const fetchBookingsForUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      console.log("Fetched bookings:", data);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchBookingsForUser();
    }
  }, [isLoaded, isSignedIn, fetchBookingsForUser]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSort = (field: keyof Booking) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.tempName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${booking.vehicle?.make || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${booking.vehicle?.model || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${booking.status || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBookings = filteredBookings.sort((a, b) => {
    const aValue = a[sortField] ?? "";
    const bValue = b[sortField] ?? "";
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (booking: Booking) => {
    console.log("Selected booking:", booking);
    const dailyRate = booking.vehicle?.dailyRate || 0;
    console.log("Daily rate:", dailyRate);

    setSelectedBooking(booking);
    setEditFormData({
      startDate: format(new Date(booking.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(booking.endDate), "yyyy-MM-dd"),
      pickupLocation: booking.pickupLocation,
      dropoffLocation: booking.dropoffLocation,
      specialRequests: booking.specialRequests || "",
      insurance: booking.insurance || "",
      mileagePolicy: booking.mileagePolicy || "",
      fuelPolicy: booking.fuelPolicy || "",
      totalAmount: booking.totalAmount,
      status: booking.status || "",
      dailyRate: dailyRate,
    });
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    console.log("Dates or rate changed:", {
      startDate: editFormData.startDate,
      endDate: editFormData.endDate,
      dailyRate: editFormData.dailyRate,
    });

    if (
      editFormData.startDate &&
      editFormData.endDate &&
      editFormData.dailyRate
    ) {
      const calculatedAmount = calculateTotalAmount(
        editFormData.startDate,
        editFormData.endDate,
        editFormData.dailyRate
      );
      console.log("Calculated amount:", calculatedAmount);

      setEditFormData((prev) => ({
        ...prev,
        totalAmount: calculatedAmount,
      }));
    }
  }, [
    editFormData.startDate,
    editFormData.endDate,
    editFormData.dailyRate,
    calculateTotalAmount,
  ]);

  const handleDelete = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`/api/bookings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedBooking.id,
          ...editFormData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update booking");
      }

      await fetchBookingsForUser();
      setIsEditModalOpen(false);
      alert("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update booking"
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`/api/bookings?id=${selectedBooking.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete booking");
      }

      await fetchBookingsForUser();
      setIsDeleteModalOpen(false);
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete booking"
      );
    }
  };

  const toggleRowExpansion = (bookingId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(bookingId)) {
      newExpandedRows.delete(bookingId);
    } else {
      newExpandedRows.add(bookingId);
    }
    setExpandedRows(newExpandedRows);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <>
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
                    <TableHead>Details</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Amount
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <Fragment key={booking.id}>
                      <TableRow>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(booking.id)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          {booking.vehicle
                            ? `${booking.vehicle.make} ${booking.vehicle.model}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>{booking.tempName || "Guest"}</TableCell>
                        <TableCell>
                          {format(new Date(booking.startDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.endDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${booking.totalAmount}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(booking)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="hidden md:inline ml-1">
                                Edit
                              </span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(booking)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden md:inline ml-1">
                                Delete
                              </span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedRows.has(booking.id) && (
                        <TableRow
                          key={`${booking.id}-expanded`}
                          className="bg-muted/50"
                        >
                          <TableCell colSpan={7}>
                            <div className="grid grid-cols-2 gap-4 p-4">
                              <div>
                                <h4 className="font-semibold mb-2 text-center">
                                  Booking Details
                                </h4>
                                <p>Pickup Location: {booking.pickupLocation}</p>
                                <p>
                                  Dropoff Location: {booking.dropoffLocation}
                                </p>
                                <p>
                                  Special Requests:{" "}
                                  {booking.specialRequests || "None"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Policy Information
                                </h4>
                                <p>
                                  Insurance:{" "}
                                  {booking.insurance || "Not specified"}
                                </p>
                                <p>
                                  Mileage Policy:{" "}
                                  {booking.mileagePolicy || "Not specified"}
                                </p>
                                <p>
                                  Fuel Policy:{" "}
                                  {booking.fuelPolicy || "Not specified"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Customer Information
                                </h4>
                                <p>Name: {booking.tempName || "Guest"}</p>
                                <p>
                                  Email: {booking.tempEmail || "Not provided"}
                                </p>
                                <p>
                                  Phone: {booking.tempPhone || "Not provided"}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Vehicle Information
                                </h4>
                                <p>Make: {booking.vehicle?.make}</p>
                                <p>Model: {booking.vehicle?.model}</p>
                                <p>Year: {booking.vehicle?.year}</p>
                                <p>Daily Rate: ${booking.vehicle?.dailyRate}</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
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
                  disabled={
                    currentPage ===
                    Math.ceil(sortedBookings.length / itemsPerPage)
                  }
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>
              Make changes to your booking here. Total amount will update
              automatically when dates change.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editFormData.startDate}
                  onChange={(e) => {
                    console.log("Start date changed:", e.target.value);
                    setEditFormData({
                      ...editFormData,
                      startDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editFormData.endDate}
                  onChange={(e) => {
                    console.log("End date changed:", e.target.value);
                    setEditFormData({
                      ...editFormData,
                      endDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <Input
                  id="pickupLocation"
                  value={editFormData.pickupLocation}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      pickupLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                <Input
                  id="dropoffLocation"
                  value={editFormData.dropoffLocation}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      dropoffLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="insurance">Insurance</Label>
                <Input
                  id="insurance"
                  value={editFormData.insurance}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      insurance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mileagePolicy">Mileage Policy</Label>
                <Input
                  id="mileagePolicy"
                  value={editFormData.mileagePolicy}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      mileagePolicy: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fuelPolicy">Fuel Policy</Label>
                <Input
                  id="fuelPolicy"
                  value={editFormData.fuelPolicy}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      fuelPolicy: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalAmount">Total Amount ($)</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={editFormData.totalAmount}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      totalAmount: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Input
                id="specialRequests"
                value={editFormData.specialRequests}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    specialRequests: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
