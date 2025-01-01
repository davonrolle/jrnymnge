"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Coffee, Loader2 } from "lucide-react";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";

// Add types at the top of the file


interface Booking {
  id: string;
  tempName?: string;
  tempEmail?: string;
  tempPhone?: string;
  vehicleBooked: string;
  vehicleId: string;
  startDate: string | Date;
  endDate: string | Date;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequests?: string;
  insurance?: string;
  mileagePolicy?: string;
  fuelPolicy?: string;
  totalAmount: number;
  status?: string;
  vehicle?: {
    make: string;
    model: string;
    year: number;
    dailyRate: number;
  };
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface Notification {
  id: string;
  message: string;
  type: "booking";
}

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [selectedBookingDetails, setSelectedBookingDetails] =
    useState<Booking | null>(null);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);

  const signedOutNavItems = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/FAQ", label: "FAQ" },
  ];

  const signedInNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/bookings", label: "Bookings" },
    { href: "/dashboard/vehicles", label: "Fleet" },
    { href: "/dashboard/customers", label: "Customers" },
    { href: "/dashboard/reports", label: "Reports" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        const response = await fetch("/api/bookings?notifications=true");
        const data = await response.json();
        setUpcomingBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching upcoming bookings:", error);
        setUpcomingBookings([]);
      }
    };

    fetchUpcomingBookings();
  }, []);

  const notifications: Notification[] = (upcomingBookings || []).map(
    (booking) => ({
      id: booking.id,
      message: `Booking for ${booking.vehicle?.make} ${
        booking.vehicle?.model
      } on ${format(new Date(booking.startDate), "MMM dd, yyyy")}`,
      type: "booking",
    })
  );

  const handleViewBooking = async (bookingId: string) => {
    try {
      setIsLoadingBooking(true);
      console.log("Loading state activated");
      const response = await fetch(`/api/bookings?id=${bookingId}`);
      const data = await response.json();
      setSelectedBookingDetails(data);
      setIsBookingDetailsOpen(true);
      setIsNotificationsOpen(false);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setIsLoadingBooking(false);
      console.log("Loading state deactivated");
    }
  };

  return (
    <header className="sticky w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center h-14 px-6">
        {/* JRNY logo on the left */}
        <Link href="/" className="font-bold text-xl text-primary animate-pulse">
          JRNY
        </Link>

        {/* Navigation links on the right */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button asChild className="font-bold animate-pulse">
            <Link href="/donate">
              Donate a Coffee
              <Coffee className="animate-bounce" />
            </Link>
          </Button>
          <SignedOut>
            {signedOutNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/*<SignInButton forceRedirectUrl="/dashboard" mode="modal">
              <Button size="sm">Sign in</Button>
            </SignInButton>*/}
          </SignedOut>
          <SignedIn>
            <Dialog
              open={isNotificationsOpen}
              onOpenChange={setIsNotificationsOpen}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="z-[100]">
                <DialogHeader>
                  <DialogTitle>Upcoming Bookings</DialogTitle>
                  <DialogDescription>
                    Bookings in the next 5 days
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-center justify-between p-2 rounded-md"
                      >
                        <div className="flex items-start space-x-2">
                          <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <p>{notification.message}</p>
                        </div>
                        {notification.type === "booking" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewBooking(notification.id)}
                            disabled={isLoadingBooking}
                          >
                            {isLoadingBooking ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Loading...
                              </>
                            ) : (
                              "View Details"
                            )}
                          </Button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center">
                      No upcoming bookings
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            {signedInNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <SignOutButton>
              <Button variant="destructive" size="sm">
                Sign out
              </Button>
            </SignOutButton>
          </SignedIn>
        </nav>

        {/* Notifications and mobile menu toggle on small screens */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button asChild className="font-bold animate-pulse">
            <Link href="/donate">
              Donate a Coffee
              <Coffee className="animate-bounce" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col space-y-2 p-4 bg-background border-t">
          <SignedOut>
            {signedOutNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-full text-center"
                onClick={handleNavLinkClick}
              >
                {item.label}
              </Link>
            ))}
            {/*<SignInButton forceRedirectUrl="/dashboard" mode="modal">
              <Button className="w-full">Sign in</Button>
            </SignInButton>*/}
          </SignedOut>
          <SignedIn>
            {signedInNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors w-full text-center"
                onClick={handleNavLinkClick}
              >
                {item.label}
              </Link>
            ))}
            <SignOutButton>
              <Button variant="destructive" className="w-full">
                Sign out
              </Button>
            </SignOutButton>
          </SignedIn>
        </nav>
      </div>

      {/* Add Booking Details Dialog */}
      <Dialog
        open={isBookingDetailsOpen}
        onOpenChange={setIsBookingDetailsOpen}
      >
        <DialogContent className="max-w-3xl z-[100]">
          <DialogHeader>
            <DialogTitle className="text-center">Booking Details</DialogTitle>
          </DialogHeader>
          {isLoadingBooking ? (
            <div className="flex items-center justify-center p-8 z-[100] relative bg-background min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            selectedBookingDetails && (
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Information</h4>
                  <p>Name: {selectedBookingDetails.tempName || "Guest"}</p>
                  <p>
                    Email:{" "}
                    {selectedBookingDetails.customer?.email || "Not provided"}
                  </p>
                  <p>
                    Phone: {selectedBookingDetails.tempPhone || "Not provided"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vehicle Information</h4>
                  <p>Make: {selectedBookingDetails.vehicle?.make}</p>
                  <p>Model: {selectedBookingDetails.vehicle?.model}</p>
                  <p>Year: {selectedBookingDetails.vehicle?.year}</p>
                  <p>
                    Daily Rate: ${selectedBookingDetails.vehicle?.dailyRate}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Booking Details</h4>
                  <p>
                    Pickup Location: {selectedBookingDetails.pickupLocation}
                  </p>
                  <p>
                    Dropoff Location: {selectedBookingDetails.dropoffLocation}
                  </p>
                  <p>
                    Special Requests:{" "}
                    {selectedBookingDetails.specialRequests || "None"}
                  </p>
                  <p>
                    Status: {selectedBookingDetails.status || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Policy Information</h4>
                  <p>
                    Insurance:{" "}
                    {selectedBookingDetails.insurance || "Not specified"}
                  </p>
                  <p>
                    Mileage Policy:{" "}
                    {selectedBookingDetails.mileagePolicy || "Not specified"}
                  </p>
                  <p>
                    Fuel Policy:{" "}
                    {selectedBookingDetails.fuelPolicy || "Not specified"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h4 className="font-semibold mb-2">Dates</h4>
                  <p>
                    Start Date:{" "}
                    {format(
                      new Date(selectedBookingDetails.startDate),
                      "MMM dd, yyyy"
                    )}
                  </p>
                  <p>
                    End Date:{" "}
                    {format(
                      new Date(selectedBookingDetails.endDate),
                      "MMM dd, yyyy"
                    )}
                  </p>
                </div>
                <div className="col-span-2 mt-4 text-right">
                  <p className="text-lg font-semibold">
                    Total Amount: ${selectedBookingDetails.totalAmount}
                  </p>
                </div>
              </div>
            )
          )}
          <DialogFooter>
            <Button onClick={() => setIsBookingDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
