"use client";

import { Loader2, Car } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center space-y-8 p-4">
      {/* Logo */}
      <h1 className="text-4xl md:text-6xl font-bold text-primary animate-pulse tracking-wider">
        JRNY
      </h1>

      {/* Car Animation */}
      <div className="relative">
        <Car className="h-12 w-12 text-primary animate-bounce" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full animate-pulse" />
      </div>

      {/* Loading Spinner */}
      <div className="relative">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin [animation-duration:2s]" />
      </div>

      {/* Loading Message */}
      <p className="text-lg md:text-xl text-muted-foreground animate-bounce [animation-duration:2s]">
        Loading your information...
      </p>

      {/* Screen Reader Text */}
      <div className="sr-only" role="status" aria-live="polite">
        Loading your information. Please wait.
      </div>
    </div>
  );
}