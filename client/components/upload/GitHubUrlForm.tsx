'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GitHubUrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function GitHubUrlForm({ onSubmit, isLoading, error }: GitHubUrlFormProps) {
  const [url, setUrl] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!url.trim()) {
      setLocalError('Please enter a GitHub URL');
      return;
    }

    if (!url.includes('github.com')) {
      setLocalError('Please enter a valid GitHub URL');
      return;
    }

    onSubmit(url);
  };

  return (
    <Card className="p-8 bg-card border-border">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground text-lg">GitHub Repository</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze code coverage directly from a GitHub repository
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github-url" className="text-foreground">
            Repository URL
          </Label>
          <Input
            id="github-url"
            type="url"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="bg-background text-foreground placeholder:text-muted-foreground border-input"
          />
        </div>

        {(error || localError) && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {localError || error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {isLoading ? 'Processing...' : 'Analyze Repository'}
        </Button>
      </form>
    </Card>
  );
}
