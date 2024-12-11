'use client';

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Edit, Eye, MoreHorizontal, Trash, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  totalBookings: number;
  status: string;
};

export default function CustomerManagement() {
  const { userId, getToken } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`/api/customers?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message || "An error occurred while fetching customers.");
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [getToken, userId]);

  const deleteCustomer = async (customerId: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/customers?id=${customerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      setCustomers((prev) => prev.filter((customer) => customer.id !== customerId));
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
    return customers.filter((customer) => customer.status.toLowerCase() === filter.toLowerCase());
  };

  useEffect(() => {
    if (userId) {
      fetchCustomers();
    }
  }, [userId, fetchCustomers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const filteredCustomers = filterCustomers(customers);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input className="flex-grow" type="text" placeholder="Search customers..." />
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Customer ID</TableHead>
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
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div>{customer.email}</div>
                      {customer.phone && <div>{customer.phone}</div>}
                    </TableCell>
                    <TableCell>{customer.totalBookings}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status.toLowerCase() === "active"
                            ? "default"
                            : customer.status.toLowerCase() === "vip"
                            ? "secondary"
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteCustomer(customer.id)}>
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
        </CardContent>
      </Card>
    </div>
  );
}