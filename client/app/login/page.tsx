'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, error, login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      router.push('/dashboard');
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-in fade-in duration-500">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🧪</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TestCovAI
          </h1>
          <p className="text-muted-foreground mt-2">AI-Powered Code Coverage Analysis</p>
        </div>

        <AuthForm
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
          submitLabel="Sign In"
          title="Welcome Back"
        />

        <p className="text-center text-muted-foreground text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
