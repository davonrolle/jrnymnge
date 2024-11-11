import Link from "next/link";
import { ModeToggle } from "./darkmodetoggle";

export function Footer() {
  return (
    <footer className="w-full border-t py-4 backdrop-blur-lg z-20">
        <div className="container flex flex-col gap-2 px-4 md:px-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground text-center md:text-left">© 2024 JRNY. All rights reserved.</p>
          <nav className="flex items-center gap-4 justify-center md:justify-end">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
            <ModeToggle/>
          </nav>
        </div>
      </footer>
  )
}
