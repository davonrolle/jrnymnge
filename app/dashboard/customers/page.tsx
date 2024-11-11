'use client';

import { Edit, Eye, Filter, MoreHorizontal,Trash, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Dummy data for customers
const customers = [
  { id: 'C001', name: 'John Doe', email: 'john@example.com', phone: '(123) 456-7890', totalBookings: 5, status: 'Active' },
  { id: 'C002', name: 'Jane Smith', email: 'jane@example.com', phone: '(234) 567-8901', totalBookings: 3, status: 'VIP' },
  { id: 'C003', name: 'Bob Johnson', email: 'bob@example.com', phone: '(345) 678-9012', totalBookings: 1, status: 'Inactive' },
  { id: 'C004', name: 'Alice Brown', email: 'alice@example.com', phone: '(456) 789-0123', totalBookings: 7, status: 'Active' },
  { id: 'C005', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '(567) 890-1234', totalBookings: 2, status: 'Active' },
];


// Default selected customer
const selectedCustomer = customers[0];

export default function CustomerManagement() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      {/* Customer Search and Filter Panel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input className="flex-grow" type="text" placeholder="Search customers..." />
          <Select>
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
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </div>

      {/* Add New Customer Button */}
      <Button className="w-full sm:w-auto">
        <UserPlus className="mr-2 h-4 w-4" /> Add New Customer
      </Button>

      {/* Customer Overview Section */}
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
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div>{customer.email}</div>
                      <div>{customer.phone}</div>
                    </TableCell>
                    <TableCell>{customer.totalBookings}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'Active' ? 'default' : customer.status === 'VIP' ? 'secondary' : 'outline'}>
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
                          <DropdownMenuItem>
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

      {/* Customer Details Section */}
      <Dialog open={false}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer Details - {selectedCustomer.id}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <div>{selectedCustomer.name}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div>{selectedCustomer.email}</div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <div>{selectedCustomer.phone}</div>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <div>{selectedCustomer.status}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Other Tabs Content */}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}