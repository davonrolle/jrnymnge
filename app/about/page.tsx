import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Car,
  Calendar,
  CreditCard,
  BarChart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-xl text-muted-foreground">
          Streamlining car rental management for businesses of all sizes
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">Our Mission</h2>
        <p>
          At JRNY Management, our mission is to streamline the process of
          managing a car rental business by providing an intuitive, all-in-one
          platform. Whether you&apos;re an individual owner or a large rental
          company, we simplify fleet management, bookings, and payments, so you
          can focus on growing your business.
        </p>
        <p>
          We are committed to providing a seamless experience for car rental
          businesses. Our goal is to revolutionize how companies manage their
          fleets and interact with customers, driving efficiency and growth in
          the industry.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">The Problem We Solve</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We understand the difficulties rental businesses face, from managing
            multiple vehicles and bookings to ensuring accurate payments. Our
            platform is built to simplify these processes and help businesses
            run more smoothly. By addressing common pain points in the car
            rental industry, we enable our users to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Efficiently manage their fleet and track vehicle status</li>
            <li>Streamline the booking process and reduce double-bookings</li>
            <li>Automate payment processing and financial reporting</li>
            <li>Gain valuable insights through detailed analytics</li>
          </ul>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Car className="mr-2 h-5 w-5" />
                Fleet Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              Easily track and manage your entire fleet, including maintenance
              schedules and vehicle availability.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                Booking System
              </CardTitle>
            </CardHeader>
            <CardContent>
              Streamline your booking process with our intuitive calendar
              interface and real-time availability updates.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              Securely handle payments, deposits, and refunds with our
              integrated payment system.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <BarChart className="mr-2 h-5 w-5" />
                Analytics & Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              Gain valuable insights into your business performance with
              detailed analytics and customizable reports.
            </CardContent>
          </Card>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Meet the Founder</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/faceshot.jpg"
            alt="Davon Rolle"
            width={200}
            height={200}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-center">
              Davon Rolle
            </h3>
            <p className="mb-4">
              Hi, I&apos;m Davon Rolle, the founder of JRNY Management. With
              some experience in the car rental industry, I&apos;ve
              witnessed firsthand the challenges that rental businesses face
              daily. This inspired me to create a solution that simplifies
              operations and helps businesses thrive in this competitive market.
            </p>
            <p>
              My background in both technology and car rentals has allowed me to
              develop a platform that truly understands and addresses the needs
              of rental business owners. I&apos;m passionate about continually
              improving JRNY Management to meet the evolving demands of our
              users.
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
  <h2 className="text-2xl font-semibold text-center">Our Vision for Impact</h2>
  <div className="grid md:grid-cols-2 gap-4">
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4">
          JRNY Management is designed to revolutionize the car rental industry by providing an intuitive, user-friendly platform that simplifies daily operations for business owners. From managing bookings to tracking fleet performance, we&apos;re here to make your life easier.
        </p>
        <p className="font-semibold">- Empowering Business Growth</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6">
        <p className="mb-4">
          Our platform is built to drive tangible results: helping businesses increase bookings, reduce administrative workload, and deliver seamless customer experiences. We are committed to helping you achieve greater efficiency and profitability.
        </p>
        <p className="font-semibold">- Driving Results That Matter</p>
      </CardContent>
    </Card>
  </div>
</section>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>Ready to Transform Your Rental Business?</CardTitle>
          <CardDescription>
            Join what will be thousands of satisfied users and start managing your fleet with
            ease.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild size="lg" className="font-bold">
            <Link href="/">
              Join Our Waitlist
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
