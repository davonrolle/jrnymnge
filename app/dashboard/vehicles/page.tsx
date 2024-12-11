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

// Define the vehicle type
interface Vehicle {
  id: string; // Prisma uses string UUIDs by default
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: string;
  lastService: string;
  mileage: number;
  userId: string; // Reference to the user owning the vehicle
}

export default function FleetManagement() {
  const { user } = useUser(); // Get current user from Clerk
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch vehicles from the API for the current user
  useEffect(() => {
    if (!user) return; // If user is not available, don't fetch anything

    const fetchVehicles = async () => {
      try {
        const response = await fetch(`/api/vehicles?userId=${user.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Vehicle[] = await response.json();
        setVehicles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      }
    };

    fetchVehicles();
  }, [user]);

  // Handle vehicle deletion
  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
  
    try {
      // Use query parameter format for the DELETE request
      const response = await fetch(`/api/vehicles?id=${vehicleId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Successfully deleted, update the vehicles state
        setVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        );
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button variant="outline" onClick={() => setSearchQuery("")}>
          Clear
        </Button>
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
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    License Plate
                  </TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Last Service
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Mileage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.id}</TableCell>
                      <TableCell>{`${vehicle.make} ${vehicle.model} (${vehicle.year})`}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {vehicle.licensePlate}
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
                        {vehicle.lastService}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {vehicle.mileage} miles
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
                            <DialogTitle>Vehicle Details</DialogTitle>
                            {selectedVehicle &&
                              selectedVehicle.id === vehicle.id && (
                                <>
                                  <p>
                                    <strong>Make:</strong> {vehicle.make}
                                  </p>
                                  <p>
                                    <strong>Model:</strong> {vehicle.model}
                                  </p>
                                  <p>
                                    <strong>Year:</strong> {vehicle.year}
                                  </p>
                                  <p>
                                    <strong>License Plate:</strong>{" "}
                                    {vehicle.licensePlate}
                                  </p>
                                  <p>
                                    <strong>Availability:</strong>{" "}
                                    {vehicle.status}
                                  </p>
                                  <p>
                                    <strong>Last Service:</strong>{" "}
                                    {vehicle.lastService}
                                  </p>
                                  <p>
                                    <strong>Mileage:</strong> {vehicle.mileage}{" "}
                                    miles
                                  </p>

                                  {/* Delete Button */}
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteVehicle(vehicle.id)
                                    }
                                    className="mt-4"
                                  >
                                    Delete Vehicle
                                  </Button>
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