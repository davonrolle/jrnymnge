"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Crown,
  Edit,
  Eye,
  MoreHorizontal,
  Trash,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalBookings: number;
  status: string;
  createdAt: string;
  Booking: {
    id: string;
    startDate: string;
    endDate: string;
    totalAmount: number;
    vehicleBooked: string;
  }[];
};

export default function CustomerManagement() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
  });
  const router = useRouter();

  const fetchCustomers = useCallback(async () => {
    if (!isSignedIn || !userId) return;

    setLoading(true);
    try {
      const response = await fetch("/api/customers");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch customers");
      }

      const data = await response.json();

      const transformedCustomers = data.map((customer: Customer) => ({
        ...customer,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        totalBookings: customer.totalBookings || 0,
        status: customer.status || "Active",
        Booking: customer.Booking || [],
      }));

      setCustomers(transformedCustomers);
    } catch (err: unknown) {
      console.error("Error fetching customers:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching customers");
      }
    } finally {
      setLoading(false);
    }
  }, [userId, isSignedIn]);

  const deleteCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`/api/customers?id=${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== customerId)
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message || "An error occurred while deleting the customer.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const filterCustomers = (customers: Customer[]) => {
    if (filter === "all") return customers;
    return customers.filter(
      (customer) => customer.status.toLowerCase() === filter.toLowerCase()
    );
  };

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => {
      setSelectedCustomer(null);
    }, 100);
  };

  const editCustomer = (customer: Customer) => {
    setEditFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || "",
      status: customer.status,
    });
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      const response = await fetch(`/api/customers?id=${selectedCustomer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      setCustomers(
        customers.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...editFormData }
            : customer
        )
      );

      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer");
    }
  };

  const calculateTotalSpent = (bookings: Customer["Booking"]) => {
    return bookings.reduce((total, booking) => total + booking.totalAmount, 0);
  };

  const handleDeleteClick = (customerId: string) => {
    setCustomerToDelete(customerId);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
      await deleteCustomer(customerToDelete);
      setIsDeleteAlertOpen(false);
      setCustomerToDelete(null);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchCustomers();
    }
  }, [isSignedIn, userId, fetchCustomers]);

  if (!isLoaded || !isSignedIn) {
    return <div className="p-4">Loading...</div>;
  }

  if (loading) return <div className="p-4">Loading customers...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const filteredCustomers = filterCustomers(customers);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Search customers..."
          />
          <Select onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button asChild className="w-full sm:w-auto">
        <Link href="/dashboard/customers/create">
          <UserPlus className="mr-2 h-4 w-4" /> Add New Customer
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
          <CardDescription>Manage your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>
                No customers found. Get started by adding your first customer!
              </p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/customers/create">
                  <UserPlus className="mr-2 h-4 w-4" /> Add New Customer
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Total Bookings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {customer.status.toLowerCase() === "vip" && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                          {`${customer.firstName} ${customer.lastName}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{customer.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {customer.totalBookings}
                        </div>
                        {customer.totalBookings > 5 && (
                          <Badge variant="secondary">Frequent Customer</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.status === "VIP"
                              ? "secondary"
                              : customer.status === "Active"
                              ? "default"
                              : "outline"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => viewCustomerDetails(customer)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => editCustomer(customer)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(customer.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleDialogClose();
        }}
      >
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
            handleDialogClose();
          }}
        >
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete information about the customer
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Personal Information</h4>
                <p>
                  Name:{" "}
                  {`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
                </p>
                <p>Email: {selectedCustomer.email}</p>
                <p>Phone: {selectedCustomer.phone}</p>
                <p>Status: {selectedCustomer.status}</p>
              </div>
              <div>
                <h4 className="font-semibold">Booking Information</h4>
                <p>Total Bookings: {selectedCustomer.totalBookings}</p>
                <p>
                  Total Spent: $
                  {calculateTotalSpent(selectedCustomer.Booking).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Make changes to customer information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editFormData.firstName}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editFormData.lastName}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value) =>
                    setEditFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              customer and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
