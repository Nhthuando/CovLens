'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function LandingHeader() {
  return (
    <header className="border-b border-border/50 bg-gradient-to-b from-background via-background to-background/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl">🧪</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition">
            TestCovAI
          </h1>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">
            How it Works
          </Link>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/login">Get Started</Link>
          </Button>
        </nav>

        <div className="sm:hidden">
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/login">Start Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
