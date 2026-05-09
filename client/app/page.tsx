'use client';

import { LandingHeader } from '@/components/layout/LandingHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <LandingHeader />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-6 text-center max-w-3xl mx-auto animate-in fade-in duration-700">
          <div className="text-5xl sm:text-6xl font-bold text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Unlock Code Coverage Insights with AI
            </span>
          </div>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Analyze your source code, understand coverage gaps, and get actionable insights. Powered by advanced AI
            technology to give you comprehensive coverage reports in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base"
            >
              <Link href="/register">Start Free Analysis</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary/10 h-12 px-8 text-base"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to understand and improve your code coverage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              title: 'Comprehensive Analysis',
              description: 'Get detailed insights into coverage metrics and identify gaps in your tests.',
            },
            {
              icon: '🤖',
              title: 'AI-Powered Insights',
              description:
                'Our AI analyzes your code patterns and suggests improvements to increase coverage.',
            },
            {
              icon: '⚡',
              title: 'Fast Processing',
              description: 'Analyze projects of any size in minutes with our optimized system.',
            },
            {
              icon: '🔗',
              title: 'GitHub Integration',
              description: 'Connect your GitHub repository for seamless continuous analysis.',
            },
            {
              icon: '📈',
              title: 'Historical Tracking',
              description: 'Monitor coverage trends over time and celebrate improvements.',
            },
            {
              icon: '🎯',
              title: 'Actionable Recommendations',
              description:
                'Receive specific, prioritized recommendations to boost your coverage score.',
            },
          ].map((feature, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple three-step process to get your code coverage analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: '1',
              title: 'Upload Your Code',
              description: 'Share your source code as a ZIP file or connect your GitHub repository.',
            },
            {
              number: '2',
              title: 'AI Analysis',
              description: 'Our AI analyzes your codebase and test coverage, finding gaps and patterns.',
            },
            {
              number: '3',
              title: 'Get Insights',
              description:
                'Receive comprehensive reports and actionable recommendations to improve coverage.',
            },
          ].map((step, index) => (
            <div key={index} className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ready to Improve Your Code Quality?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join developers who are using TestCovAI to understand and improve their code coverage.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base"
            >
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2024 TestCovAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
