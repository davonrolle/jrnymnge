import {
  Calendar,
  Car,
  Filter,
  Plus,
  Settings,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Dummy data for vehicles
const vehicles = [
  {
    id: "V001",
    make: "Honda",
    model: "Accord",
    year: 2020,
    licensePlate: "ABC123",
    availability: "Available",
    lastService: "2023-05-15",
    mileage: 25000,
  },
  {
    id: "V002",
    make: "Toyota",
    model: "Camry",
    year: 2019,
    licensePlate: "XYZ789",
    availability: "Rented",
    lastService: "2023-04-20",
    mileage: 35000,
  },
  {
    id: "V003",
    make: "Ford",
    model: "Escape",
    year: 2021,
    licensePlate: "DEF456",
    availability: "Under Maintenance",
    lastService: "2023-06-01",
    mileage: 15000,
  },
  {
    id: "V004",
    make: "Chevrolet",
    model: "Malibu",
    year: 2018,
    licensePlate: "GHI789",
    availability: "Available",
    lastService: "2023-05-10",
    mileage: 45000,
  },
  {
    id: "V005",
    make: "Nissan",
    model: "Altima",
    year: 2022,
    licensePlate: "JKL012",
    availability: "Rented",
    lastService: "2023-05-25",
    mileage: 10000,
  },
];

export default function FleetManagement() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

      {/* Search and Filter Panel */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            className="flex-grow"
            type="text"
            placeholder="Search vehicles..."
          />
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" /> Availability Calendar
          </Button>
        </div>
      </div>

      {/* Add New Vehicle Button */}
      <Button className="w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" /> Add New Vehicle
      </Button>

      {/* Fleet Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
          <CardDescription>Manage your vehicle fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Vehicle ID</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.id}</TableCell>
                    <TableCell>{`${vehicle.make} ${vehicle.model} ${vehicle.year}`}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          vehicle.availability === "Available"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {vehicle.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.lastService}</TableCell>
                    <TableCell>
                      {vehicle.mileage.toLocaleString()} miles
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              Vehicle Details - {vehicle.id}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div>
                              <h3 className="font-semibold">
                                Vehicle Information
                              </h3>
                              <p>
                                Make & Model:{" "}
                                {`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                              </p>
                              <p>License Plate: {vehicle.licensePlate}</p>
                              <p>
                                Current Mileage:{" "}
                                {vehicle.mileage.toLocaleString()} miles
                              </p>
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Status Management
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Switch id="availability" />
                                <Label htmlFor="availability">Available</Label>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                Maintenance History
                              </h3>
                              <p>Last Service Date: {vehicle.lastService}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold">Actions</h3>
                              <div className="flex flex-wrap gap-2">
                                <Button size="sm">
                                  <Settings className="mr-2 h-4 w-4" />
                                  Schedule Maintenance
                                </Button>
                                <Button size="sm" variant="outline">
                                  Edit Vehicle
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Remove Vehicle
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
          <CardDescription>
            Perform actions on multiple vehicles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Car className="mr-2 h-4 w-4" />
              Update Availability
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Schedule Maintenance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
