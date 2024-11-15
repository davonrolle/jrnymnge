import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Car,
  Calendar,
  Users,
  BarChart,
  Shield,
  CreditCard,
  HeadphonesIcon,
  Smartphone,
  Cog,
  ChevronRight,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      id: "fleet-management",
      title: "Fleet Management",
      icon: <Car className="h-6 w-6" />,
      description:
        "Efficiently manage your entire fleet with our comprehensive tools.",
      subFeatures: [
        {
          title: "Vehicle Tracking",
          description:
            "View and manage your entire fleet, check availability, and see the location and status of each vehicle in real-time.",
        },
        {
          title: "Maintenance Reminders",
          description:
            "Stay on top of vehicle maintenance with automated reminders and scheduling tools to keep your fleet in top condition.",
        },
        {
          title: "Insurance Management",
          description:
            "Easily store and track insurance details with automated reminders for renewals to ensure continuous coverage.",
        },
      ],
    },
    {
      id: "booking-management",
      title: "Booking Management",
      icon: <Calendar className="h-6 w-6" />,
      description: "Streamline your booking process and maximize efficiency.",
      subFeatures: [
        {
          title: "Calendar Integration",
          description:
            "Sync your booking calendar with Google Calendar or Outlook for real-time management of reservations.",
        },
        {
          title: "Automated Booking & Approvals",
          description:
            "Set up auto-approvals or manual review processes with instant notifications for new bookings.",
        },
        {
          title: "Recurring Bookings",
          description:
            "Easily set up and manage recurring bookings for repeat customers, enhancing convenience and loyalty.",
        },
        {
          title: "Flexible Pricing Options",
          description:
            "Implement seasonal, weekend, or custom pricing strategies to maximize revenue and occupancy.",
        },
      ],
    },
    {
      id: "customer-management",
      title: "Customer Management",
      icon: <Users className="h-6 w-6" />,
      description:
        "Build stronger relationships with your customers through our CRM tools.",
      subFeatures: [
        {
          title: "Customer Relationship Management (CRM)",
          description:
            "Store and manage customer data, track rental history, and add notes about preferences for personalized service.",
        },
        {
          title: "Automated Notifications",
          description:
            "Send automated SMS or email notifications for booking confirmations, payment reminders, and feedback requests.",
        },
        {
          title: "Digital Agreements",
          description:
            "Create, send, and store digital rental agreements with secure online signing capabilities.",
        },
      ],
    },
    {
      id: "analytics-reporting",
      title: "Analytics & Reporting",
      icon: <BarChart className="h-6 w-6" />,
      description:
        "Gain valuable insights to make data-driven decisions for your business.",
      subFeatures: [
        {
          title: "Revenue Tracking",
          description:
            "View income per vehicle, total revenue, and track rental performance over time with detailed reports.",
        },
        {
          title: "Utilization Reports",
          description:
            "Analyze fleet utilization rates to optimize vehicle usage and identify opportunities for growth.",
        },
        {
          title: "Customer Insights",
          description:
            "Generate reports on customer behavior, repeat bookings, and feedback scores to improve service quality.",
        },
        {
          title: "Expense Management",
          description:
            "Track and categorize operational expenses such as fuel, maintenance, and repairs for accurate financial planning.",
        },
      ],
    },
    {
      id: "security-features",
      title: "Security Features",
      icon: <Shield className="h-6 w-6" />,
      description:
        "Ensure the safety of your fleet and protect your business with advanced security tools.",
      subFeatures: [
        {
          title: "Driver License Verification",
          description:
            "Integrate with ID verification services to authenticate customers and ensure compliance.",
        },
        {
          title: "GPS and Geo-fencing",
          description:
            "Track vehicles in real-time and set up geo-fencing alerts to monitor and protect your fleet.",
        },
        {
          title: "Damage Reporting",
          description:
            "Document vehicle damages with photo uploads and descriptions at check-out and return times for accurate records.",
        },
      ],
    },
    {
      id: "invoicing-payments",
      title: "Invoicing & Payments",
      icon: <CreditCard className="h-6 w-6" />,
      description:
        "Simplify your financial processes with integrated payment and invoicing solutions.",
      subFeatures: [
        {
          title: "Integrated Payments",
          description:
            "Accept credit card payments directly through the platform with support for popular payment providers like Stripe.",
        },
        {
          title: "Automated Invoicing",
          description:
            "Generate and email invoices automatically after each rental, saving time and reducing manual errors.",
        },
        {
          title: "Deposit Management",
          description:
            "Easily handle deposits, including automated refunds after vehicle return and damage assessments.",
        },
      ],
    },
    {
      id: "customer-support",
      title: "Customer Support Tools",
      icon: <HeadphonesIcon className="h-6 w-6" />,
      description:
        "Provide excellent customer service with our integrated support tools.",
      subFeatures: [
        {
          title: "Customer Support Portal",
          description:
            "Offer a dedicated portal where customers can submit questions, report issues, and track their inquiries.",
        },
        {
          title: "Live Chat",
          description:
            "For premium plans, provide live chat support to streamline customer communication and resolve issues quickly.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          All the Tools You Need to Run Your Car Rental Business
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our platform helps you streamline operations, improve customer
          satisfaction, and optimize fleet management. Discover how our features
          can transform your car rental business.
        </p>
      </div>

      <div className="space-y-12 mb-12">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <CardTitle className="text-2xl justify-center flex items-center gap-2">
                {feature.icon}
                {feature.title}
              </CardTitle>
              <CardDescription className="text-center">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {feature.subFeatures.map((subFeature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        {subFeature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{subFeature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" />
              Mobile Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Manage your rental operations on-the-go with our fully responsive
              mobile app. Access all features from any device, anywhere,
              anytime.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-6 w-6" />
              Customization Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Personalize your rental platform with custom branding, including
              your company logo, brand colors, and tailored notification
              templates.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          See Our Features in Action
        </h2>
        <div className="aspect-video bg bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">
            Interactive demo or video tour would be displayed here
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Revolutionize Your Car Rental Business?
        </h2>
        <Button size="lg">
          Start Your Free Trial
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
