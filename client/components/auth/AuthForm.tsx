'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface AuthFormProps {
  isLoading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  submitLabel: string;
  title: string;
}

export function AuthForm({ isLoading, error, onSubmit, submitLabel, title }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    const result = await onSubmit(email, password);
    if (!result.success) {
      setFormError(result.error || 'An error occurred');
    }
  };

  return (
    <Card className="w-full max-w-md p-8 bg-card border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm">
          {title.includes('Login') ? 'Access your code coverage analysis' : 'Start analyzing your code coverage'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-background text-foreground placeholder:text-muted-foreground border-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="bg-background text-foreground placeholder:text-muted-foreground border-input"
          />
        </div>

        {(error || formError) && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {formError || error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? 'Loading...' : submitLabel}
        </Button>
      </form>
    </Card>
  );
}
