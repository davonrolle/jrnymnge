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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Introduction",
      content: (
        <>
          <p>
            Welcome to JRNY&apos;s Privacy Policy. This policy is designed to inform
            you about how we collect, use, store, and protect your personal
            information when you use our car rental management platform.
          </p>
          <p>
            By using JRNY, you consent to the data practices described in this
            policy. We are committed to protecting your privacy and ensuring you
            have a positive experience on our platform.
          </p>
        </>
      ),
    },
    {
      title: "Information Collection",
      content: (
        <>
          <p>We collect the following types of information:</p>
          <h4 className="font-semibold mt-2">Personal Information:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email address, phone number</li>
            <li>Payment information</li>
            <li>Vehicle details (for vehicle owners)</li>
          </ul>
          <h4 className="font-semibold mt-2">Usage Data:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Device information</li>
            <li>IP address</li>
            <li>Browsing behavior on our platform</li>
          </ul>
          <h4 className="font-semibold mt-2">Location Data:</h4>
          <p>
            If you opt-in, we may collect location data for location-based
            services or vehicle tracking.
          </p>
          <h4 className="font-semibold mt-2">Methods of Collection:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Information you provide directly</li>
            <li>Data gathered through cookies and similar technologies</li>
            <li>
              Information from third-party integrations (e.g., payment
              processors)
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Use of Information",
      content: (
        <>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Service Improvement:</strong> To enhance our platform&apos;s
              services, user experience, and functionalities.
            </li>
            <li>
              <strong>Communication:</strong> To send important updates,
              promotional content (with your consent), and notifications about
              your account or transactions.
            </li>
            <li>
              <strong>Analytics:</strong> To analyze user behavior and improve
              our platform&apos;s performance and features.
            </li>
            <li>
              <strong>Legal Requirements:</strong> To comply with legal
              obligations and protect the safety and security of our users and
              platform.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Sharing and Disclosure",
      content: (
        <>
          <p>We may share your information in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Third-Party Services:</strong> We use third-party services
              for functions such as payment processing and data storage. These
              services have their own privacy policies and data handling
              practices.
            </li>
            <li>
              <strong>Business Transfers:</strong> If JRNY is involved in a
              merger, acquisition, or sale of assets, your data may be
              transferred as part of that transaction.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose your
              information to comply with a legal obligation, protect our rights,
              or respond to valid legal requests.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "User Rights and Choices",
      content: (
        <>
          <p>
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Access and Correction:</strong> You can access and update
              your personal information through your account settings.
            </li>
            <li>
              <strong>Data Deletion:</strong> You may request the deletion of
              your account and associated data by contacting our support team.
            </li>
            <li>
              <strong>Opt-Out Options:</strong> You can opt-out of marketing
              communications and manage your cookie preferences in your account
              settings.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <p>
          We retain your personal information for as long as your account is
          active or as needed to provide you services. We may also retain and
          use your information as necessary to comply with our legal
          obligations, resolve disputes, and enforce our agreements.
        </p>
      ),
    },
    {
      title: "Security Measures",
      content: (
        <>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Secure data storage practices</li>
          </ul>
          <p className="mt-2">
            While we strive to use commercially acceptable means to protect your
            personal information, no method of transmission over the Internet or
            method of electronic storage is 100% secure.
          </p>
        </>
      ),
    },
    {
      title: "Cookies and Tracking Technologies",
      content: (
        <>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our platform and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
          <p>
            To manage your cookie preferences or disable tracking, please refer
            to your browser&apos;s help documentation.
          </p>
        </>
      ),
    },
    {
      title: "Children's Privacy",
      content: (
        <p>
          JRNY is not intended for children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us so that we
          can take necessary actions.
        </p>
      ),
    },
    {
      title: "Changes to This Privacy Policy",
      content: (
        <>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date at the top of this Privacy
            Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <p className="mt-2">Email: privacy@jrny.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Privacy Street, Nassau, NP 00000, Bahamas</p>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>
            Last updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At JRNY, we are committed to protecting your privacy and ensuring
            you have a positive experience on our platform. This privacy policy
            outlines our practices concerning the collection, use, and
            disclosure of your information.
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
          By using JRNY, you agree to the collection and use of information in
          accordance with this policy.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
