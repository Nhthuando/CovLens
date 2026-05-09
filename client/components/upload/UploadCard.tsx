'use client';

import { FileDropzone } from './FileDropzone';
import { GitHubUrlForm } from './GitHubUrlForm';

interface UploadCardProps {
  onFileUpload: (file: File) => void;
  onGitHubSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function UploadCard({ onFileUpload, onGitHubSubmit, isLoading, error }: UploadCardProps) {
  return (
    <div className="space-y-6 w-full">
      <FileDropzone onFileSelect={onFileUpload} isLoading={isLoading} error={error} />
      <GitHubUrlForm onSubmit={onGitHubSubmit} isLoading={isLoading} error={error} />
    </div>
  );
}
