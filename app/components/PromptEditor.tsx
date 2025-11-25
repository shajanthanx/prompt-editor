'use client';

import { useState, useEffect, useRef } from 'react';
import { saveCurrentPrompt, getCurrentPrompt } from '../utils/storage';

interface PromptEditorProps {
    onPromptChange?: (content: string) => void;
    initialContent?: string;
}

export default function PromptEditor({ onPromptChange, initialContent = '' }: PromptEditorProps) {
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Load saved content on mount
        const saved = getCurrentPrompt();
        if (saved) {
            setContent(saved);
            updateCounts(saved);
        } else if (initialContent) {
            setContent(initialContent);
            updateCounts(initialContent);
        }
    }, []);

    useEffect(() => {
        if (initialContent && initialContent !== content) {
            setContent(initialContent);
            updateCounts(initialContent);
        }
    }, [initialContent]);

    const updateCounts = (text: string) => {
        setCharCount(text.length);
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        setWordCount(words.length);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setContent(newContent);
        updateCounts(newContent);
        saveCurrentPrompt(newContent);
        onPromptChange?.(newContent);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClear = () => {
        if (content && confirm('Are you sure you want to clear the editor?')) {
            setContent('');
            updateCounts('');
            saveCurrentPrompt('');
            onPromptChange?.('');
        }
    };

    const handleExport = (format: 'txt' | 'md' | 'json') => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompt-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const insertAtCursor = (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + text + content.substring(end);

        setContent(newContent);
        updateCounts(newContent);
        saveCurrentPrompt(newContent);
        onPromptChange?.(newContent);

        // Set cursor position after inserted text
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    // Expose insertAtCursor method
    useEffect(() => {
        (window as any).insertTextAtCursor = insertAtCursor;
    }, [content]);

    return (
        <div className="flex flex-col gap-md" style={{ height: '100%' }}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Prompt Editor</h2>
                    <p className="text-sm text-muted">
                        Craft and refine your AI prompts with ease
                    </p>
                </div>
                <div className="flex gap-sm">
                    <button
                        onClick={handleCopy}
                        className="btn btn-secondary btn-icon"
                        title="Copy to clipboard"
                    >
                        {copied ? '✓' : '📋'}
                    </button>
                    <button
                        onClick={handleClear}
                        className="btn btn-secondary btn-icon"
                        title="Clear editor"
                        disabled={!content}
                    >
                        🗑️
                    </button>
                    <div style={{ position: 'relative' }}>
                        <button className="btn btn-secondary" title="Export prompt">
                            ⬇️ Export
                        </button>
                        <div
                            className="export-menu"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '0.5rem',
                                background: 'var(--bg-elevated)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.5rem',
                                display: 'none',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                minWidth: '120px',
                                zIndex: 10,
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.display = 'flex'}
                        >
                            <button onClick={() => handleExport('txt')} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                                .txt
                            </button>
                            <button onClick={() => handleExport('md')} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                                .md
                            </button>
                            <button onClick={() => handleExport('json')} className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
                                .json
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    placeholder="Start crafting your prompt here...

Tip: Use templates and power phrases from the sidebars to enhance your prompts!"
                    style={{
                        flex: 1,
                        minHeight: '400px',
                        fontSize: '0.95rem',
                        lineHeight: '1.7',
                        fontFamily: 'inherit',
                    }}
                />
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between" style={{
                padding: 'var(--spacing-md)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
            }}>
                <div className="flex gap-lg">
                    <div className="flex items-center gap-sm">
                        <span className="text-sm text-muted">Characters:</span>
                        <span className="text-sm" style={{ fontWeight: 500 }}>{charCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-sm">
                        <span className="text-sm text-muted">Words:</span>
                        <span className="text-sm" style={{ fontWeight: 500 }}>{wordCount.toLocaleString()}</span>
                    </div>
                </div>
                <div className="text-xs text-muted">
                    Auto-saved ✓
                </div>
            </div>

            <style jsx>{`
        .btn:hover + .export-menu,
        .export-menu:hover {
          display: flex !important;
        }
      `}</style>
        </div>
    );
}
