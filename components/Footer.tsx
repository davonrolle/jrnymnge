import Link from "next/link"
import { ModeToggle } from "./darkmodetoggle"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t py-4 backdrop-blur-lg bg-background/80 z-20">
      <div className="container flex flex-col gap-4 px-4 md:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} JRNY. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 justify-center md:justify-end">
          <Link className="text-sm hover:underline underline-offset-4 transition-colors" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline underline-offset-4 transition-colors" href="/privacy">
            Privacy Policy
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </footer>
  )
}