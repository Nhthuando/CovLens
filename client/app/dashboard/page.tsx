'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useApi } from '@/lib/hooks/useApi';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { UploadCard } from '@/components/upload/UploadCard';
import { StatusBadge } from '@/components/upload/StatusBadge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { buildApiUrl, extractErrorMessage } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuth();
  const { isLoading, error, request } = useApi(token);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>(
    'idle'
  );
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [projectId, setProjectId] = useState('');
  const [projectIdError, setProjectIdError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated && token === null) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleFileUpload = async (file: File) => {
    if (!projectId.trim()) {
      setProjectIdError('Project ID is required');
      setUploadStatus('error');
      setStatusMessage('Please enter a valid project ID before uploading.');
      return;
    }

    setProjectIdError(null);
    setUploadStatus('uploading');
    setStatusMessage('Uploading your file...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId.trim());

    const response = await fetch(buildApiUrl('/uploads/zip'), {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      const errorMessage = extractErrorMessage(payload, 'Upload failed. Please try again.');
      setUploadStatus('error');
      setStatusMessage(errorMessage);
      return;
    }

    setUploadStatus('success');
    setStatusMessage('Upload complete. You can start a new analysis or track it in your backend.');
  };

  const handleGitHubSubmit = async (url: string) => {
    if (!projectId.trim()) {
      setProjectIdError('Project ID is required');
      setUploadStatus('error');
      setStatusMessage('Please enter a valid project ID before submitting a repository.');
      return;
    }

    setProjectIdError(null);
    setUploadStatus('processing');
    setStatusMessage('Analyzing GitHub repository...');

    const { error } = await request('/uploads/github-url', {
      method: 'POST',
      body: JSON.stringify({ projectId: projectId.trim(), repoUrl: url }),
    });

    if (error) {
      setUploadStatus('error');
      setStatusMessage(error);
      return;
    }

    setUploadStatus('success');
    setStatusMessage('Repository submitted. You can track its status in your backend.');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="User" onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Start Analysis</h2>
          <p className="text-muted-foreground">
            Upload your source code or connect a GitHub repository to begin analyzing your code coverage.
          </p>
        </div>

        <Card className="mb-6 p-6 bg-card border-border">
          <div className="space-y-2">
            <Label htmlFor="project-id" className="text-foreground">
              Project ID
            </Label>
            <Input
              id="project-id"
              placeholder="Enter your backend project ID"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
              className="bg-background text-foreground placeholder:text-muted-foreground border-input"
            />
            {projectIdError && <p className="text-sm text-destructive">{projectIdError}</p>}
          </div>
        </Card>

        <UploadCard
          onFileUpload={handleFileUpload}
          onGitHubSubmit={handleGitHubSubmit}
          isLoading={isLoading}
          error={error}
        />

        {uploadStatus !== 'idle' && (
          <Card className="mt-8 p-6 bg-card border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Analysis Status</h3>
                <StatusBadge status={uploadStatus} message={statusMessage} />
              </div>
              {uploadStatus === 'success' && (
                <button
                  onClick={() => router.push('/results')}
                  className="text-primary hover:underline font-medium"
                >
                  View Results →
                </button>
              )}
            </div>
          </Card>
        )}

        <Card className="mt-12 p-8 bg-card border-border">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Tip: Supported Formats</h3>
                <p className="text-muted-foreground text-sm">
                  ZIP files with complete source code. We currently support JavaScript and Python projects.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Quick Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Most analyses complete within minutes. Larger projects may take longer.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
