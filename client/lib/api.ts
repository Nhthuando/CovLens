const DEFAULT_API_BASE_URL = 'http://localhost:3001';

type ErrorPayload = {
  message?: string;
  error?: unknown;
};

const getFirstFieldError = (error: unknown): string | null => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const fieldErrors = (error as { fieldErrors?: Record<string, string[]> }).fieldErrors;
  if (!fieldErrors || typeof fieldErrors !== 'object') {
    return null;
  }

  const firstKey = Object.keys(fieldErrors)[0];
  if (!firstKey) {
    return null;
  }

  const messages = fieldErrors[firstKey];
  if (Array.isArray(messages) && messages[0]) {
    return messages[0];
  }

  return null;
};

export const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
};

export const buildApiUrl = (path: string) => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const baseUrl = getApiBaseUrl().replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

export const extractErrorMessage = (payload: ErrorPayload | null, fallback: string) => {
  if (!payload) {
    return fallback;
  }

  if (typeof payload.message === 'string' && payload.message.trim().length > 0) {
    return payload.message;
  }

  if (typeof payload.error === 'string' && payload.error.trim().length > 0) {
    return payload.error;
  }

  const fieldError = getFirstFieldError(payload.error);
  if (fieldError) {
    return fieldError;
  }

  return fallback;
};
