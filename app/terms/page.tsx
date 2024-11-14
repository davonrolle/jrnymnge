import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "Introduction and Agreement to Terms",
      content: (
        <>
          <p>Welcome to JRNY, a car rental management platform. These Terms and Conditions govern your use of our platform and services.</p>
          <p>By accessing or using JRNY, you agree to be bound by these terms, which may be updated periodically. It is your responsibility to review these terms regularly.</p>
        </>
      )
    },
    {
      title: "Definitions",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Platform:</strong> The JRNY car rental management application and website.</li>
          <li><strong>User:</strong> Any individual or entity that accesses or uses the Platform.</li>
          <li><strong>Service:</strong> The car rental management tools and features provided by JRNY.</li>
          <li><strong>Vehicle Owner:</strong> A User who lists vehicles for rent on the Platform.</li>
        </ul>
      )
    },
    {
      title: "User Accounts",
      content: (
        <>
          <p>To use JRNY, you must create an account. You agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Be at least 18 years old.</li>
            <li>Provide accurate, current, and complete information.</li>
            <li>Maintain the security of your account and password.</li>
            <li>Notify us immediately of any unauthorized access or use of your account.</li>
          </ul>
        </>
      )
    },
    {
      title: "Services Provided",
      content: (
        <>
          <p>JRNY provides a platform for managing car rental operations, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Booking management</li>
            <li>Fleet management</li>
            <li>Payment processing</li>
            <li>Customer management</li>
          </ul>
          <p>JRNY does not own or operate any vehicles. We solely facilitate connections between renters and vehicle owners.</p>
        </>
      )
    },
    {
      title: "User Conduct and Responsibilities",
      content: (
        <>
          <p>Users of JRNY agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Engage in unauthorized access or use of the Platform.</li>
            <li>Use data scraping or similar data gathering methods.</li>
            <li>Misrepresent vehicle information or rental terms.</li>
            <li>Violate any applicable laws or regulations.</li>
          </ul>
          <p>Vehicle owners are responsible for providing accurate and up-to-date information about their vehicles and rental terms.</p>
        </>
      )
    },
    {
      title: "Bookings and Payments",
      content: (
        <>
          <p><strong>Booking Process:</strong> Bookings are confirmed once payment is processed and the vehicle owner accepts the reservation.</p>
          <p><strong>Payment Terms:</strong> JRNY facilitates payments between renters and vehicle owners. We may charge service fees for using our platform.</p>
          <p><strong>Cancellations and Refunds:</strong> Cancellation policies are set by vehicle owners. Refunds, if applicable, will be processed according to these policies.</p>
        </>
      )
    },
    {
      title: "Liability and Insurance",
      content: (
        <>
          <p>JRNY is not liable for any disputes, accidents, or damage arising from rental transactions facilitated through our platform.</p>
          <p>Users are responsible for ensuring appropriate insurance coverage for their rentals. JRNY does not provide insurance coverage.</p>
        </>
      )
    },
    {
      title: "Privacy and Data Use",
      content: (
        <>
          <p>Our data collection, storage, and use practices are outlined in our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
          <p>Users are responsible for any personal information they share on the platform, including vehicle details and payment information.</p>
        </>
      )
    },
    {
      title: "Termination of Use",
      content: (
        <p>JRNY reserves the right to terminate or suspend access to our services, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      )
    },
    {
      title: "Dispute Resolution and Governing Law",
      content: (
        <>
          <p>Any disputes arising from the use of JRNY will be resolved through arbitration, conducted in accordance with the rules of the American Arbitration Association.</p>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.</p>
        </>
      )
    },
    {
      title: "Limitation of Liability",
      content: (
        <p>JRNY shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
      )
    },
    {
      title: "Changes to Terms",
      content: (
        <>
          <p>We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or through the platform.</p>
          <p>Your continued use of JRNY after changes to the Terms constitutes acceptance of those changes.</p>
        </>
      )
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Please read these terms and conditions carefully before using the JRNY car rental management platform.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>{section.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          By using JRNY, you agree to these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}