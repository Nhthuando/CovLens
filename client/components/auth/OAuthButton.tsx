'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface OAuthButtonProps {
  provider: 'github';
  isLoading: boolean;
}

export function OAuthButton({ provider, isLoading }: OAuthButtonProps) {
  const getProviderInfo = () => {
    switch (provider) {
      case 'github':
        return {
          label: 'Continue with GitHub',
          icon: '🐙',
        };
    }
  };

  const info = getProviderInfo();

  return (
    <Link href={`/auth/oauth/${provider}`}>
      <Button
        type="button"
        disabled={isLoading}
        variant="outline"
        className="w-full border-border text-foreground hover:bg-secondary/10"
      >
        <span className="mr-2">{info.icon}</span>
        {info.label}
      </Button>
    </Link>
  );
}
