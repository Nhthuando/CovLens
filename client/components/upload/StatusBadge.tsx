'use client';

interface StatusBadgeProps {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  message?: string;
}

export function StatusBadge({ status, message }: StatusBadgeProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'uploading':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950',
          text: 'text-blue-700 dark:text-blue-300',
          icon: '⬆️',
          label: 'Uploading...',
        };
      case 'processing':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950',
          text: 'text-purple-700 dark:text-purple-300',
          icon: '⚙️',
          label: 'Processing...',
        };
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-950',
          text: 'text-green-700 dark:text-green-300',
          icon: '✓',
          label: 'Complete',
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-950',
          text: 'text-red-700 dark:text-red-300',
          icon: '✕',
          label: 'Failed',
        };
      default:
        return null;
    }
  };

  const info = getStatusInfo();
  if (!info) return null;

  return (
    <div className={`rounded-full px-3 py-1 text-sm font-medium flex items-center gap-2 ${info.bg} ${info.text}`}>
      <span>{info.icon}</span>
      <span>{message || info.label}</span>
    </div>
  );
}
