import Link from "next/link"
import Image from "next/image"
import { Radar, Mail, Phone, CreditCard, AlertTriangle, BookOpen, Award, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-4xl">
          {/* Logo and Brand Name */}
          <div className="flex items-center gap-2">
            <Radar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Verifeye</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            <Link href="#" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="#scam-types" className="text-sm font-medium hover:underline">
              Scam Types
            </Link>
            <Link href="#learn" className="text-sm font-medium hover:underline">
              Learning Center
            </Link>
            <Link href="#get-started" className="text-sm font-medium hover:underline">
              Resources
            </Link>
          </nav>

          {/* Call to Action Button */}
          <Button asChild>
            <Link href="#get-started">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 text-center">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6 mx-auto text-center">
            <div className="max-w-[800px] space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Protect Yourself & Loved Ones
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Stay Safe in the Digital World
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Learn to identify and avoid scams with our simple, engaging lessons designed for everyone, especially
                seniors.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="#get-started">Start Learning Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-background border-y text-center">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-3 text-center mx-auto place-items-center w-full max-w-4xl">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">$5.8B+</div>
                <p className="text-muted-foreground">Lost to scams in 2021 alone</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">2.4M</div>
                <p className="text-muted-foreground">Fraud reports filed annually</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">11%</div>
                <p className="text-muted-foreground">Rise in scams targeting adults over 60</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">$80M</div>
                <p className="text-muted-foreground">Money lost to cryptocurrency scams in 2021</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">$500</div>
                <p className="text-muted-foreground">Median loss per scam victim</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">25%</div>
                <p className="text-muted-foreground">Percentage of Phising scams</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer section */}
      <footer className="w-full border-t py-6 md:py-0 text-center">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24 px-4 md:px-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            {/* <Radar className="h-6 w-6 text-primary" /> */}
            <span className="text-lg font-semibold">Verifeye</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact Us
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Verifeye. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
