'use client';

import { useCallback, useState } from 'react';
import { buildApiUrl, extractErrorMessage } from '@/lib/api';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useApi<T = any>(token: string | null) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const request = useCallback(
    async (endpoint: string, options: RequestInit = {}): Promise<{ data: T | null; error: string | null }> => {
      setState({ data: null, isLoading: true, error: null });

      try {
        const headers: HeadersInit = {
          ...options.headers,
        };

        if (!(options.body instanceof FormData)) {
          headers['Content-Type'] = 'application/json';
        }

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(buildApiUrl(endpoint), {
          ...options,
          headers,
        });

        if (!response.ok) {
          let errorMsg = 'Request failed';
          const payload = await response.json().catch(() => null);

          if (response.status === 401) {
            errorMsg = 'Unauthorized. Please log in again.';
          } else if (response.status === 400 || response.status === 422) {
            errorMsg = extractErrorMessage(payload, errorMsg);
          } else {
            errorMsg = extractErrorMessage(payload, `Server error (${response.status})`);
          }

          setState({ data: null, isLoading: false, error: errorMsg });
          return { data: null, error: errorMsg };
        }

        const data = await response.json();
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Network error';
        setState({ data: null, isLoading: false, error: errorMsg });
        return { data: null, error: errorMsg };
      }
    },
    [token]
  );

  return { ...state, request };
}
