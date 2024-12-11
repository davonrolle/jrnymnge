"use client";

import PayPalButton from "@/components/PayPalNoCode";

export default function DonatePage() {

  return (
    <div className="container text-center flex flex-col items-center justify-center mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Support Our Car Rental Management System</h2>
      <p className="mb-4 leading-relaxed">
        We&apos;re dedicated to providing a seamless car rental management experience for our community. Your support helps us maintain and improve our services, ensuring we can continue to offer reliable and efficient car rental solutions.
      </p>
      <p className="text-sm text-white/70 italic">
        Every donation, no matter the size, makes a difference. We deeply appreciate your generosity and support in helping us grow and serve you better. Thank you for being part of our journey! ☕️
      </p>
      <br />
      <PayPalButton />
    </div>
  );
}
