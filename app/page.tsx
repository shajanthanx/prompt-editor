'use client';

import { useState, useRef } from 'react';
import PromptEditor from './components/PromptEditor';
import TemplateLibrary from './components/TemplateLibrary';
import PowerPhrases from './components/PowerPhrases';
import SavedPrompts from './components/SavedPrompts';
import ThemeToggle from './components/ThemeToggle';

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
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-primary)',
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: leftSidebarOpen ? '320px' : '0',
        transition: 'width var(--transition-base)',
        overflow: 'hidden',
        borderRight: leftSidebarOpen ? '1px solid var(--border-color)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {leftSidebarOpen && (
          <div style={{
            padding: 'var(--spacing-lg)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-xs)',
              marginBottom: 'var(--spacing-lg)',
              borderBottom: '1px solid var(--border-color)',
            }}>
              <button
                onClick={() => setActiveLeftTab('templates')}
                className="btn btn-ghost"
                style={{
                  borderRadius: 0,
                  borderBottom: activeLeftTab === 'templates' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: activeLeftTab === 'templates' ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                Templates
              </button>
              <button
                onClick={() => setActiveLeftTab('phrases')}
                className="btn btn-ghost"
                style={{
                  borderRadius: 0,
                  borderBottom: activeLeftTab === 'phrases' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: activeLeftTab === 'phrases' ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                Power Phrases
              </button>
            </div>

            {/* Tab Content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {activeLeftTab === 'templates' ? (
                <TemplateLibrary onTemplateSelect={handleTemplateSelect} />
              ) : (
                <PowerPhrases onPhraseSelect={handlePhraseSelect} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <header style={{
          padding: 'var(--spacing-lg) var(--spacing-xl)',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <button
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                className="btn btn-ghost btn-icon"
                title="Toggle left sidebar"
              >
                ☰
              </button>
              <div>
                <h1 style={{
                  fontSize: '1.75rem',
                  background: 'var(--accent-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Prompter
                </h1>
                <p className="text-xs text-muted">AI Prompt Crafting Studio</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
              <ThemeToggle />
              <button
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                className="btn btn-ghost btn-icon"
                title="Toggle saved prompts"
              >
                💾
              </button>
            </div>
          </div>
        </header>

        {/* Editor */}
        <main style={{
          flex: 1,
          padding: 'var(--spacing-xl)',
          overflow: 'auto',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', height: '100%' }}>
            <PromptEditor
              onPromptChange={setCurrentPrompt}
              initialContent={currentPrompt}
            />
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <div style={{
        width: rightSidebarOpen ? '320px' : '0',
        transition: 'width var(--transition-base)',
        overflow: 'hidden',
        borderLeft: rightSidebarOpen ? '1px solid var(--border-color)' : 'none',
      }}>
        {rightSidebarOpen && (
          <div style={{
            padding: 'var(--spacing-lg)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <SavedPrompts
              onPromptLoad={handlePromptLoad}
              currentContent={currentPrompt}
            />
          </div>
        )}
      </div>
    </div>
  );
}
