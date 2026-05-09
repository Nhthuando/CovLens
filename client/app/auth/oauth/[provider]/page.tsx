'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function OAuthCallbackPage({ params }: { params: { provider: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && state) {
      // Exchange code for token
      const exchangeToken = async () => {
        try {
          const response = await fetch(`/api/auth/oauth/${params.provider}/callback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, state }),
          });

          if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('auth_token', token);
            router.push('/dashboard');
          } else {
            router.push('/auth/oauth/failed');
          }
        } catch (error) {
          console.error('OAuth callback error:', error);
          router.push('/auth/oauth/failed');
        }
      };

      exchangeToken();
    } else {
      router.push('/auth/oauth/failed');
    }
  }, [params.provider, router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">⏳</div>
          <h2 className="text-2xl font-bold text-foreground">Connecting...</h2>
          <p className="text-muted-foreground">Completing your authentication with {params.provider}.</p>
        </div>
      </Card>
    </div>
  );
}
