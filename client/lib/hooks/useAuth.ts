'use client';

import { useCallback, useState, useEffect } from 'react';
import { buildApiUrl, extractErrorMessage } from '@/lib/api';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isLoading: true,
    error: null,
  });

  // Initialize from localStorage
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    setAuthState({
      token,
      isLoading: false,
      error: null,
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setAuthState({ token: null, isLoading: true, error: null });
    try {
      const response = await fetch(buildApiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const message = extractErrorMessage(payload, 'Login failed');
        throw new Error(message);
      }

      const token = payload?.token as string | undefined;
      if (!token) {
        throw new Error('Missing access token');
      }

      localStorage.setItem('auth_token', token);
      setAuthState({ token, isLoading: false, error: null });
      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setAuthState({ token: null, isLoading: false, error: message });
      return { success: false, error: message };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setAuthState({ token: null, isLoading: true, error: null });
    try {
      const response = await fetch(buildApiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        const message = extractErrorMessage(payload, 'Registration failed');
        throw new Error(message);
      }

      const loginResult = await login(email, password);
      if (!loginResult.success) {
        throw new Error(loginResult.error || 'Registration failed');
      }

      return { success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setAuthState({ token: null, isLoading: false, error: message });
      return { success: false, error: message };
    }
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setAuthState({ token: null, isLoading: false, error: null });
  }, []);

  const isAuthenticated = !!authState.token;

  return {
    ...authState,
    isAuthenticated,
    login,
    register,
    logout,
  };
}
