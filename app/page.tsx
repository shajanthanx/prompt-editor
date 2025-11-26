'use client';

import { useState } from 'react';
import { Menu, Save, Sidebar, Moon, Sun, LayoutTemplate, Sparkles } from 'lucide-react';
import PromptEditor from './components/PromptEditor';
import TemplateLibrary from './components/TemplateLibrary';
import PowerPhrases from './components/PowerPhrases';
import SavedPrompts from './components/SavedPrompts';
import ThemeToggle from './components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [activeLeftTab, setActiveLeftTab] = useState<'templates' | 'phrases'>('templates');

  const handleTemplateSelect = (content: string) => {
    setCurrentPrompt(content);
  };

  const handlePhraseSelect = (text: string) => {
    // Insert at cursor position using the global function
    if ((window as any).insertTextAtCursor) {
      (window as any).insertTextAtCursor(text);
    } else {
      // Fallback: append to end
      setCurrentPrompt(prev => prev + (prev ? '\n\n' : '') + text);
    }
  };

  const handlePromptLoad = (content: string) => {
    setCurrentPrompt(content);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r transition-[width] duration-300 ease-in-out overflow-hidden",
          leftSidebarOpen ? "w-80" : "w-0 border-r-0"
        )}
      >
        <div className="flex flex-col h-full p-4 overflow-hidden">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b">
            <Button
              variant="ghost"
              onClick={() => setActiveLeftTab('templates')}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 pb-2 pt-1 hover:bg-transparent",
                activeLeftTab === 'templates'
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveLeftTab('phrases')}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4 pb-2 pt-1 hover:bg-transparent",
                activeLeftTab === 'phrases'
                  ? "border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Phrases
            </Button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeLeftTab === 'templates' ? (
              <TemplateLibrary onTemplateSelect={handleTemplateSelect} />
            ) : (
              <PowerPhrases onPhraseSelect={handlePhraseSelect} />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              title="Toggle left sidebar"
            >
              <Sidebar className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Prompter
              </h1>
              <p className="text-xs text-muted-foreground">AI Prompt Crafting Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              title="Toggle saved prompts"
            >
              <Save className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Editor */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto h-full">
            <PromptEditor
              onPromptChange={setCurrentPrompt}
              initialContent={currentPrompt}
            />
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <div
        className={cn(
          "transition-[width] duration-300 ease-in-out overflow-hidden border-l",
          rightSidebarOpen ? "w-80" : "w-0 border-l-0"
        )}
      >
        <div className="flex flex-col h-full p-4 overflow-hidden">
          <SavedPrompts
            onPromptLoad={handlePromptLoad}
            currentContent={currentPrompt}
          />
        </div>
      </div>
    </div>
  );
}
