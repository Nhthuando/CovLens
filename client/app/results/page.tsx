'use client';

import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const { isAuthenticated, logout, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && token === null) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Mock data for demonstration
  const mockAnalysis = {
    fileName: 'project-2024-11-09.zip',
    uploadedAt: 'Nov 9, 2024',
    coverageScore: 78,
    totalTests: 342,
    passedTests: 298,
    failedTests: 44,
    coveredFiles: 127,
    totalFiles: 163,
    recommendations: [
      { priority: 'high', text: 'Add tests for error handling in API routes' },
      { priority: 'high', text: 'Increase coverage for authentication module' },
      { priority: 'medium', text: 'Add integration tests for database operations' },
      { priority: 'medium', text: 'Cover edge cases in payment processing' },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="User" onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Analysis Results</h2>
              <p className="text-muted-foreground mt-1">{mockAnalysis.fileName}</p>
            </div>
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              New Analysis
            </Button>
          </div>

          {/* Coverage Overview */}
          <Card className="p-8 bg-card border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Coverage Score</p>
                <div className="flex items-end gap-3">
                  <div className="text-5xl font-bold text-primary">{mockAnalysis.coverageScore}%</div>
                  <div className="mb-1 text-sm text-green-600 dark:text-green-400">↑ 12%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${mockAnalysis.coverageScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Test Results</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-foreground font-semibold">{mockAnalysis.passedTests} Passed</span>
                    <span className="text-green-600 dark:text-green-400">
                      {Math.round((mockAnalysis.passedTests / mockAnalysis.totalTests) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-green-500/20 rounded-full h-2">
                    <div
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${(mockAnalysis.passedTests / mockAnalysis.totalTests) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between pt-2 text-sm text-muted-foreground">
                    <span>{mockAnalysis.failedTests} Failed</span>
                    <span>
                      {Math.round((mockAnalysis.failedTests / mockAnalysis.totalTests) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-sm">File Coverage</p>
                <div className="flex items-end gap-3">
                  <div className="text-5xl font-bold text-accent">
                    {Math.round((mockAnalysis.coveredFiles / mockAnalysis.totalFiles) * 100)}%
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  {mockAnalysis.coveredFiles} of {mockAnalysis.totalFiles} files
                </p>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Recommendations</h3>
            <div className="space-y-3">
              {mockAnalysis.recommendations.map((rec, index) => (
                <Card
                  key={index}
                  className={`p-4 border-l-4 ${
                    rec.priority === 'high'
                      ? 'border-l-red-500 bg-red-50 dark:bg-red-950/20'
                      : 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                  } border-border`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`text-lg mt-1 ${
                        rec.priority === 'high' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                      }`}
                    >
                      {rec.priority === 'high' ? '⚠️' : '💡'}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{rec.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Priority: <span className="capitalize font-semibold">{rec.priority}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Analysis Metadata */}
          <Card className="p-6 bg-card border-border">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-muted-foreground text-sm">Uploaded</p>
                <p className="text-foreground font-semibold mt-1">{mockAnalysis.uploadedAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Tests</p>
                <p className="text-foreground font-semibold mt-1">{mockAnalysis.totalTests}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Files Analyzed</p>
                <p className="text-foreground font-semibold mt-1">{mockAnalysis.totalFiles}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
