"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk hook to get the current user
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Vehicle type definition
type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string | null;
  status: "Available" | "Rented" | "Maintenance";
  dailyRate: number;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};

// Form data type based on Zod schema
type FormData = z.infer<typeof formSchema>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type BadgeVariant = "default" | "secondary" | "destructive" | "success";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getStatusBadgeVariant = (status: Vehicle["status"]): BadgeVariant => {
  switch (status) {
    case "Available":
      return "success";
    case "Rented":
      return "default";
    case "Maintenance":
      return "destructive";
    default:
      return "default";
  }
};

// Form schema with proper types
const formSchema = z.object({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  dailyRate: z.number().positive(),
  licensePlate: z.string().optional(),
  status: z.enum(["Available", "Rented", "Maintenance"] as const),
});

// Update the status filter type to include 'all'
type VehicleStatus = Vehicle["status"] | "all";

export default function FleetManagement() {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatus>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Fetch vehicles from the API for the current user
  useEffect(() => {
    if (!user) return; // If user is not available, don't fetch anything

    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, [user]);

  // Update handleDeleteVehicle with proper types
  const handleDeleteVehicle = async (vehicleId: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const response = await fetch(`/api/vehicles?id=${vehicleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
      );
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Update the filtering logic with proper types
  const filteredVehicles = vehicles.filter((vehicle: Vehicle) => {
    const matchesSearch =
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleEdit = async (values: FormData): Promise<void> => {
    if (!selectedVehicle) return;

    try {
      const response = await fetch(`/api/vehicles`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedVehicle.id,
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vehicle");
      }

      const updatedVehicle: Vehicle = await response.json();
      setVehicles((prevVehicles) =>
        prevVehicles.map((v) =>
          v.id === updatedVehicle.id ? updatedVehicle : v
        )
      );

      setIsEditing(false);
      setSelectedVehicle(updatedVehicle);
    } catch (error) {
      console.error("Error updating vehicle:", error);
      alert("Failed to update vehicle");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

      {/* Search and Filter Panel */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          className="flex-grow"
          type="text"
          placeholder="Search vehicles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={statusFilter}
          onValueChange={(value: VehicleStatus) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Rented">Rented</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery("");
            setStatusFilter("all");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Add stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.filter((v) => v.status === "Available").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rented</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.filter((v) => v.status === "Rented").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              In Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.filter((v) => v.status === "Maintenance").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Vehicle Button */}
      <Button asChild className="w-full sm:w-auto">
        <Link href="/dashboard/vehicles/create">Add New Vehicle</Link>
      </Button>

      {/* Fleet Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Make & Model</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    License Plate
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Daily Rate
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{`${vehicle.make} ${vehicle.model} (${vehicle.year})`}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {vehicle.licensePlate || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            vehicle.status === "Available"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        ${vehicle.dailyRate}/day
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedVehicle(vehicle)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>
                              {isEditing ? "Edit Vehicle" : "Vehicle Details"}
                            </DialogTitle>
                            {selectedVehicle && (
                              <>
                                {isEditing ? (
                                  <Form {...form}>
                                    <form
                                      onSubmit={form.handleSubmit(handleEdit)}
                                      className="space-y-4"
                                    >
                                      <FormField
                                        control={form.control}
                                        name="make"
                                        defaultValue={selectedVehicle.make}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Make</FormLabel>
                                            <FormControl>
                                              <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name="model"
                                        defaultValue={selectedVehicle.model}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Model</FormLabel>
                                            <FormControl>
                                              <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name="year"
                                        defaultValue={selectedVehicle.year}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                  field.onChange(
                                                    parseInt(e.target.value)
                                                  )
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name="dailyRate"
                                        defaultValue={selectedVehicle.dailyRate}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Daily Rate</FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                step="0.01"
                                                {...field}
                                                onChange={(e) =>
                                                  field.onChange(
                                                    parseFloat(e.target.value)
                                                  )
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name="licensePlate"
                                        defaultValue={
                                          selectedVehicle.licensePlate || ""
                                        }
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>License Plate</FormLabel>
                                            <FormControl>
                                              <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name="status"
                                        defaultValue={selectedVehicle.status}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <SelectTrigger>
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Available">
                                                  Available
                                                </SelectItem>
                                                <SelectItem value="Rented">
                                                  Rented
                                                </SelectItem>
                                                <SelectItem value="Maintenance">
                                                  Maintenance
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <div className="flex justify-end space-x-2 mt-4">
                                        <Button
                                          variant="outline"
                                          onClick={() => setIsEditing(false)}
                                        >
                                          Cancel
                                        </Button>
                                        <Button type="submit">
                                          Save Changes
                                        </Button>
                                      </div>
                                    </form>
                                  </Form>
                                ) : (
                                  <>
                                    <div className="space-y-2">
                                      <p>
                                        <strong>Make:</strong>{" "}
                                        {selectedVehicle.make}
                                      </p>
                                      <p>
                                        <strong>Model:</strong>{" "}
                                        {selectedVehicle.model}
                                      </p>
                                      <p>
                                        <strong>Year:</strong>{" "}
                                        {selectedVehicle.year}
                                      </p>
                                      <p>
                                        <strong>License Plate:</strong>{" "}
                                        {selectedVehicle.licensePlate || "N/A"}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        {selectedVehicle.status}
                                      </p>
                                      <p>
                                        <strong>Daily Rate:</strong> $
                                        {selectedVehicle.dailyRate}
                                      </p>
                                      <p>
                                        <strong>Added:</strong>{" "}
                                        {new Date(
                                          selectedVehicle.createdAt
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>

                                    <div className="flex justify-end space-x-2 mt-4">
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsEditing(true)}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() =>
                                          handleDeleteVehicle(
                                            selectedVehicle.id
                                          )
                                        }
                                      >
                                        Delete Vehicle
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No vehicles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
