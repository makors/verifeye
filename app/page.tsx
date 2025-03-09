import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-4xl">
          {/* Logo and Brand Name */}
          <Logo />

          {/* Call to Action Button */}
          <Button asChild>
            <Link href="/login">Get Started <ChevronRight className=" h-4 w-4" /></Link>
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
                <Link href="/login">Start Learning Today</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-background border-y text-center">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-3 text-center mx-auto place-items-center w-full max-w-4xl">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">$10B+</div>
                <p className="text-muted-foreground">Lost to scams in 2023 alone</p>
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
                <div className="text-3xl font-bold md:text-4xl">$545</div>
                <p className="text-muted-foreground">Average loss from scams</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold md:text-4xl">750k+</div>
                <p className="text-muted-foreground">Instances of scams per year</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Free Forever Section */}
      <section className="w-full py-12 md:py-24 bg-background border-y">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              Free Forever
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              We Will Never Charge You
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[800px]">
              We believe in making online safety education accessible to everyone. Our mission is to protect 
              individuals from digital scams through knowledge and awareness, not paywalls.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col space-y-3 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Free Forever</h3>
              </div>
              <p className="text-muted-foreground">
                No hidden fees, subscriptions, or premium features. Everything we offer is completely free for all users.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Mission-Driven</h3>
              </div>
              <p className="text-muted-foreground">
                Our goal is to create a safer digital world by educating as many people as possible about online scams.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">For Everyone</h3>
              </div>
              <p className="text-muted-foreground">
                We're committed to making online safety education accessible to people of all backgrounds and technical abilities.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Quality Education</h3>
              </div>
              <p className="text-muted-foreground">
                We provide high-quality, up-to-date content to help you stay safe online without any cost barriers.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Start Learning Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container max-w-4xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">© 2025 Verifeye. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
