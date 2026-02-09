'use client';

import Link from 'next/link';
import { LayoutTemplate, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ThemeToggle from './components/ThemeToggle';
import { cn } from '@/lib/utils';

const modules = [
  {
    title: 'Prompt Editor',
    description: 'Craft, test and save your AI prompts with templates and power phrases.',
    icon: LayoutTemplate,
    href: '/prompt-editor',
    color: 'from-blue-500 to-indigo-600',
    tags: ['AI Tools', 'Text']
  },
  {
    title: 'Markdown to PDF',
    description: 'Convert markdown content to beautiful PDF documents with live preview.',
    icon: FileText,
    href: '/markdown-to-pdf',
    color: 'from-purple-500 to-pink-600',
    tags: ['Utilities', 'Docs']
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 font-bold">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Prompter <span className="text-primary text-[10px] ml-1 px-1.5 py-0.5 rounded-full border border-primary/20 bg-primary/10">v0.1.0</span></h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Welcome to the Studio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Choose a tool to start your creative process. All tools are modular, scalable, and built for performance.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.href} href={module.href} className="group">
              <Card className="h-full border-2 border-border/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1 relative overflow-hidden flex flex-col">
                <div className={cn(
                  "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 transition-opacity group-hover:opacity-10",
                  module.color
                )} />

                <CardHeader className="flex-1">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white mb-4 shadow-lg",
                    module.color
                  )}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{module.title}</CardTitle>
                    <ArrowRight className="w-5 h-5 text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {module.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {module.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Planned Modules Placeholder */}
          <Card className="h-full border-2 border-dashed border-border flex flex-col items-center justify-center p-8 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <CardTitle className="text-lg mb-1">More Coming Soon</CardTitle>
            <CardDescription className="text-center">
              New tools are being developed to enhance your workflow.
            </CardDescription>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-muted-foreground font-semibold">
          <p>© 2026 Prompter Studio. All tools in one place.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
