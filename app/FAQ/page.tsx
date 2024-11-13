"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Search } from 'lucide-react'

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your details, including your name, email address, and a secure password. Once you've completed the form, click 'Create Account' to get started."
      },
      {
        question: "What do I need to get started with my car rental business on the platform?",
        answer: "To get started, you'll need: 1) A valid business license for car rentals, 2) Information about your vehicles (make, model, year, etc.), 3) Insurance documentation for your fleet, and 4) A bank account for receiving payments. Once you have these, you can easily set up your rental listings on our platform."
      },
      {
        question: "Is there a free trial for new users?",
        answer: "Yes, we offer a 14-day free trial for new users. This allows you to explore all the features of our platform and set up your rental business before committing to a subscription. No credit card is required to start the trial."
      }
    ]
  },
  {
    title: "Account & Profile",
    questions: [
      {
        question: "How do I update my profile or contact information?",
        answer: "To update your profile, log into your account and click on the 'Profile' or 'Settings' option in the main menu. Here, you can edit your personal information, contact details, and business information. Don't forget to save your changes before exiting."
      },
      {
        question: "How can I change my password?",
        answer: "To change your password, go to 'Settings' in your account dashboard. Look for the 'Security' or 'Password' section. Enter your current password, then your new password twice to confirm. Click 'Save' to update your password."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account. Go to 'Settings' and look for the 'Account' section. At the bottom, you'll find an option to 'Delete Account'. Please note that this action is irreversible and will remove all your data from our platform."
      }
    ]
  },
  {
    title: "Bookings & Rentals",
    questions: [
      {
        question: "How do I create a rental listing?",
        answer: "To create a rental listing, go to your dashboard and click on 'Add New Vehicle'. Fill in the details about your vehicle, including make, model, year, features, and pricing. Add high-quality photos and set your availability calendar. Once complete, click 'Publish Listing' to make it live on the platform."
      },
      {
        question: "How can I view and manage my bookings?",
        answer: "All your bookings can be viewed in the 'Bookings' section of your dashboard. Here, you can see upcoming, current, and past rentals. Click on any booking to view details, make changes, or communicate with the renter."
      },
      {
        question: "How do I accept or reject a booking?",
        answer: "When you receive a booking request, you'll get a notification. Go to your 'Bookings' dashboard and find the pending request. You'll see options to 'Accept' or 'Decline'. If you accept, the booking is confirmed. If you decline, you can provide a reason to the potential renter."
      },
      {
        question: "Can I add multiple vehicles to my account?",
        answer: "Yes, you can add as many vehicles as you want to your account. There's no limit to the number of vehicles you can list. Simply go to your dashboard and use the 'Add New Vehicle' option for each car you want to list."
      }
    ]
  },
  {
    title: "Payment & Pricing",
    questions: [
      {
        question: "How are payments processed for bookings?",
        answer: "Payments are processed securely through our platform. When a booking is confirmed, the renter's payment is held securely. Once the rental period is complete and the vehicle is returned without issues, the payment is released to your account, minus our service fee."
      },
      {
        question: "Is there a subscription fee for using the platform?",
        answer: "Yes, we offer different subscription tiers based on the size of your fleet and the features you need. You can view our pricing plans on the 'Pricing' page. Remember, you can start with a 14-day free trial to test out the platform before subscribing."
      },
      {
        question: "How do I view and download my invoices?",
        answer: "To view and download your invoices, go to the 'Billing' section in your account dashboard. Here, you'll find a list of all your invoices. Click on any invoice to view the details, and use the 'Download' button to save a PDF copy for your records."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards (Visa, MasterCard, American Express) and PayPal for subscription payments. For rental payments, renters can use credit cards or PayPal, ensuring you receive your payments securely and promptly."
      }
    ]
  },
  {
    title: "Troubleshooting & Support",
    questions: [
      {
        question: "I can't log into my account. What should I do?",
        answer: "If you're having trouble logging in, first ensure you're using the correct email and password. If you've forgotten your password, use the 'Forgot Password' link on the login page to reset it. If you're still having issues, check your internet connection or try clearing your browser cache. If the problem persists, please contact our support team."
      },
      {
        question: "Why is my booking not showing up in the system?",
        answer: "If a booking isn't showing up, it may not have been fully confirmed. Check your email for a confirmation message. Also, refresh your dashboard page to ensure you're seeing the latest data. If you're sure the booking was confirmed and it's still not appearing, please contact our support team for assistance."
      },
      {
        question: "I'm having trouble adding a new vehicle. Any tips?",
        answer: "When adding a new vehicle, make sure you're filling out all required fields. If you're having issues uploading photos, ensure they're in a supported format (JPG, PNG) and not too large in file size. If you're seeing error messages, take a screenshot and contact our support team for help."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-4xl">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find quick answers to common questions about our car rental management platform. If you can&apos;t find what you&apos;re looking for, feel free to contact us for further assistance.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search FAQs..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFAQs.map((category, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>Common questions about {category.title.toLowerCase()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help!
        </p>
        <Button asChild>
          <Link href="/contact">
            Contact Support
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}