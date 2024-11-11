"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { SignedIn, SignInButton } from '@clerk/nextjs'
import { SignedOut, SignOutButton } from '@clerk/clerk-react'

export function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className="sticky w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex justify-between items-center h-14 px-6 lg:px-14">
          <Link href="/" className="font-bold animate-pulse">
            JRNY
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
            <SignedIn>
            <Button asChild className="ml-4" size="sm"><SignOutButton></SignOutButton></Button>
            </SignedIn>
            <SignedOut>
             <Button asChild><SignInButton></SignInButton></Button>
            </SignedOut>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        {/* Apply transition for smooth sliding effect */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          {isMobileMenuOpen && (
            <nav className="flex flex-col space-y-4 p-4 bg-background border-t">
              <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
                Pricing
              </Link>
              <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                About
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                Contact
              </Link>
              <Button className="w-full" size="sm">Get Started</Button>
            </nav>
          )}
        </div>
      </header>
  )
}
