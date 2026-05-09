'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OAuthFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="text-5xl">❌</div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Authentication Failed</h2>
            <p className="text-muted-foreground">
              We couldn&apos;t complete your OAuth authentication. Please try again or use a different method.
            </p>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/login">Back to Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary/10"
            >
              <Link href="/register">Create New Account</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
