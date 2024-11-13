// User data
const users = [
  {
    id: "user1",
    email: "john.doe@example.com",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    role: "customer",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user2",
    email: "admin@example.com",
    name: "Admin User",
    phone: "+1 (555) 765-4321",
    role: "admin",
    createdAt: new Date("2024-02-01"),
  },
  // Add more users as needed
];

// Vehicle data
const vehicles = [
  {
    id: "vehicle1",
    name: "Toyota Camry",
    type: "Sedan",
    licensePlate: "ABC123",
    availabilityStatus: "available",
    dailyRate: 55.0,
    features: ["Automatic", "Air Conditioning", "GPS"],
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "vehicle2",
    name: "Ford Explorer",
    type: "SUV",
    licensePlate: "XYZ789",
    availabilityStatus: "rented",
    dailyRate: 80.0,
    features: ["4WD", "Automatic", "Leather Seats"],
    createdAt: new Date("2024-01-12"),
  },
  // Add more vehicles as needed
];

// Booking data
const bookings = [
  {
    id: "booking1",
    userId: "user1",
    vehicleId: "vehicle1",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-05"),
    totalAmount: 275.0,
    status: "confirmed",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "booking2",
    userId: "user2",
    vehicleId: "vehicle2",
    startDate: new Date("2024-03-10"),
    endDate: new Date("2024-03-12"),
    totalAmount: 160.0,
    status: "cancelled",
    createdAt: new Date("2024-02-25"),
  },
  // Add more bookings as needed
];

// Service data
const services = [
  {
    id: "service1",
    name: "Basic Car Wash",
    description: "Exterior wash with wax and dry.",
    price: 25.0,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "service2",
    name: "Full Detailing",
    description: "Complete detailing including interior and exterior.",
    price: 75.0,
    createdAt: new Date("2024-01-07"),
  },
  // Add more services as needed
];

// Review data
const reviews = [
  {
    id: "review1",
    userId: "user1",
    vehicleId: "vehicle1",
    rating: 4.5,
    comment: "Smooth ride and very clean.",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "review2",
    userId: "user2",
    vehicleId: "vehicle2",
    rating: 3.0,
    comment: "Good experience but slightly pricey.",
    createdAt: new Date("2024-03-15"),
  },
  // Add more reviews as needed
];

// Setting data
const settings = [
  {
    id: "setting1",
    key: "supportEmail",
    value: "support@carrentalservice.com",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "setting2",
    key: "operatingHours",
    value: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "setting3",
    key: "defaultCurrency",
    value: "USD",
    createdAt: new Date("2024-01-01"),
  },
  // Add more settings as needed
];

// Export all mock data
export const mockData = {
  users,
  vehicles,
  bookings,
  services,
  reviews,
  settings,
};