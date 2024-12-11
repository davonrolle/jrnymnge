"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Coffee } from "lucide-react";
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
} from "@/components/ui/dialog";

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

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

  const notifications = [
    { id: 1, message: "New booking request received" },
    { id: 2, message: "Vehicle maintenance due in 3 days" },
    { id: 3, message: "Payment processed successfully" },
  ];

  return (
    <header className="sticky w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center h-14 px-6">
        {/* JRNY logo on the left */}
        <Link href="/" className="font-bold text-xl text-primary animate-pulse">
          JRNY
        </Link>

        {/* Navigation links on the right */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button asChild className="font-bold animate-pulse"><Link href="/donate">Donate a Coffee<Coffee className="animate-bounce"/></Link></Button>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                  <DialogDescription>
                    Your recent notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start space-x-2"
                    >
                      <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <p>{notification.message}</p>
                    </div>
                  ))}
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
        <Button asChild className="font-bold animate-pulse"><Link href="/donate">Donate a Coffee<Coffee className="animate-bounce"/></Link></Button>
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
    </header>
  );
}
