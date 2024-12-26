"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Calendar,
  Car,
  CreditCard,
  MessageCircle,
  Coffee,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Homepage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("You have successfully joined the waitlist!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
      } else {
        const error = await response.json();
        setMessage(error.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-1">
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 flex flex-col items-center">
                  <h1 className="text-3xl text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Car Rental Business
                  </h1>
                  <p className="text-center max-w-[600px] text-muted-foreground md:text-xl">
                    All-in-one management tool for car rental businesses—track
                    bookings, manage payments, and streamline operations.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 min-[400px]:flex-row justify-center">
                  <Button
                    asChild
                    className="font-bold dark:bg-stone-800 dark:hover:bg-stone-700"
                    size="lg"
                    variant="outline"
                  >
                    <Link href="/features">Learn More</Link>
                  </Button>
                  <Button className="font-bold " asChild>
                    <Link href="/preview">Preview</Link>
                  </Button>
                </div>
                <br />
                <Separator />
              </div>
              <div className="flex justify-center">
                <form
                  id="waitlist-form"
                  onSubmit={handleSubmit}
                  className="space-y-4 w-full max-w-md"
                >
                  <h2 className="text-xl font-semibold text-center">
                    Join Our Waitlist
                  </h2>
                  <p className="text-sm text-muted-foreground text-center">
                    Be the first to experience our game-changing car rental
                    management platform! Join our waitlist for early access,
                    exclusive updates, and special rewards.
                  </p>
                  {message && (
                    <p className="text-center text-sm font-bold animate-bounce text-green-500">
                      {message}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist!"
                    )}
                  </Button>
                </form>
              </div>
              <Separator />
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Love what we&apos;re building? Consider supporting us with a
                  coffee to keep the momentum going!
                </p>
                <br />
                <Button className="font-bold" asChild size="sm">
                  <Link href="/donate">
                    Buy Us a Coffee
                    <Coffee />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Calendar className="h-12 w-12 mb-2" />
                  <h3 className="text-xl font-bold">Booking Management</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Keep track of reservations and manage customer details.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Car className="h-12 w-12 mb-2" />
                  <h3 className="text-xl font-bold">Fleet Management</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Easily add and manage vehicle listings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <CreditCard className="h-12 w-12 mb-2" />
                  <h3 className="text-xl font-bold">Payment Integration</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Streamline payments and invoicing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <MessageCircle className="h-12 w-12 mb-2" />
                  <h3 className="text-xl font-bold">Customer Support Tools</h3>
                  <p className="text-sm text-center text-muted-foreground">
                    Provide communication tools for customer queries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  1
                </div>
                <h3 className="text-xl font-bold text-center">
                  Sign up for an account
                </h3>
              </div>
              <div className="flex flex-col items-center space-y-2 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  2
                </div>
                <h3 className="text-xl font-bold text-center">
                  Add your vehicles
                </h3>
              </div>
              <div className="flex flex-col items-center space-y-2 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  3
                </div>
                <h3 className="text-xl font-bold text-center">
                  Start managing bookings
                </h3>
              </div>
              <div className="flex flex-col items-center space-y-2 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  4
                </div>
                <h3 className="text-xl font-bold text-center">
                  Track payments and reports
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted justify-center hidden"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Customer Testimonials
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col space-y-2 p-6">
                  <p className="text-sm text-muted-foreground">
                    &quot;This software has revolutionized how we manage our
                    rentals. Highly recommended!&quot;
                  </p>
                  <p className="font-semibold">- John Doe, ABC Rentals</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col space-y-2 p-6">
                  <p className="text-sm text-muted-foreground">
                    &quot;Easy to use and has all the features we need. Great
                    customer support too!&quot;
                  </p>
                  <p className="font-semibold">- Jane Smith, XYZ Cars</p>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2 lg:col-span-1">
                <CardContent className="flex flex-col space-y-2 p-6">
                  <p className="text-sm text-muted-foreground">
                    &quot;Streamlined our operations and increased our
                    efficiency. A game-changer!&quot;
                  </p>
                  <p className="font-semibold">- Mike Johnson, Fast Wheels</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 justify-center hidden"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Pricing
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Basic Plan - Silver */}
              <Card className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md bg-gray-200 border border-gray-300">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Start Free Trial
                  </h3>
                  <p className="text-center text-gray-600">
                    Experience all features for 14 days
                  </p>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    ${49}
                    <span className="text-lg font-normal text-gray-600">
                      /mo
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4 text-gray-700 text-center">
                    <li>Up to 5 vehicles</li>
                    <li>Basic booking management</li>
                    <li>Customer database</li>
                    <li>Email support</li>
                    <li>Basic analytics</li>
                  </ul>
                  <Button
                    size="lg"
                    className="w-full bg-stone-700 text-white dark:hover:text-black"
                  >
                    Get Started
                  </Button>
                  <Link
                    href="/pricing"
                    className="text-sm underline text-gray-700"
                  >
                    Compare plans
                  </Link>
                </CardContent>
              </Card>

              {/* Professional Plan - Gold */}
              <Card className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 border border-yellow-400">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Professional Plan
                  </h3>
                  <p className="text-center text-white">
                    For mid-sized rental businesses needing more tools
                  </p>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${99}
                    <span className="text-lg font-normal text-white">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-4 text-white text-center">
                    <li>Up to 20 vehicles</li>
                    <li>Advanced booking management</li>
                    <li>CRM tools</li>
                    <li>Customer insights</li>
                    <li>Financial reports</li>
                    <li>Live chat support</li>
                  </ul>
                  <Button
                    size="lg"
                    className="w-full bg-stone-700 text-white dark:hover:text-black"
                  >
                    Get Started
                  </Button>
                  <Link
                    href="/pricing"
                    className="text-sm underline text-white"
                  >
                    Compare plans
                  </Link>
                </CardContent>
              </Card>

              {/* Enterprise Plan - Purple */}
              <Card className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md bg-gradient-to-r from-purple-500 to-purple-700 border border-purple-600">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    Enterprise Plan
                  </h3>
                  <p className="text-center text-white">
                    For larger businesses or companies with extensive fleets
                  </p>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${249}
                    <span className="text-lg font-normal text-white">/mo</span>
                  </div>
                  <ul className="space-y-2 mb-4 text-white text-center">
                    <li>Unlimited vehicles</li>
                    <li>Full feature access</li>
                    <li>Custom solutions</li>
                    <li>Advanced analytics</li>
                    <li>Dedicated support rep</li>
                    <li>Priority support</li>
                  </ul>
                  <Button
                    size="lg"
                    className="w-full bg-stone-700 text-white dark:hover:text-black"
                  >
                    Get Started
                  </Button>
                  <Link
                    href="/pricing"
                    className="text-sm underline text-white"
                  >
                    Compare plans
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Benefits
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Save time with automated booking management
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Reduce errors with integrated payment systems
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Improve customer satisfaction with efficient operations
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Get insights with comprehensive reporting tools
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Scale your business with ease</span>
              </li>
              <li className="flex items-center space-x-2">
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">
                  Access your data from anywhere, anytime
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
