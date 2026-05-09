'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardHeaderProps {
  userName?: string;
  onLogout: () => void;
}

export function DashboardHeader({ userName, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl">🧪</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition">
              TestCovAI
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <div className="hidden sm:block">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="text-foreground font-medium">{userName}</p>
            </div>
          )}
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-border text-foreground hover:bg-secondary/10"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
