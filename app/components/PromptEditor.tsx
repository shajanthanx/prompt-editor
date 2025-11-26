'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Trash2, Download, Check, FileText, FileJson, FileCode } from 'lucide-react';
import { saveCurrentPrompt, getCurrentPrompt } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PromptEditorProps {
    onPromptChange?: (content: string) => void;
    initialContent?: string;
}

export default function PromptEditor({ onPromptChange, initialContent = '' }: PromptEditorProps) {
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [copied, setCopied] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
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
        setShowExportMenu(false);
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
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">Prompt Editor</h2>
                    <p className="text-sm text-muted-foreground">
                        Craft and refine your AI prompts with ease
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleCopy}
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleClear}
                        title="Clear editor"
                        disabled={!content}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="relative">
                        <Button
                            variant="secondary"
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" /> Export
                        </Button>

                        {showExportMenu && (
                            <Card className="absolute top-full right-0 mt-2 p-1 min-w-[120px] z-50 flex flex-col gap-1 shadow-lg">
                                <Button variant="ghost" size="sm" onClick={() => handleExport('txt')} className="justify-start w-full">
                                    <FileText className="h-3 w-3 mr-2" /> .txt
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleExport('md')} className="justify-start w-full">
                                    <FileCode className="h-3 w-3 mr-2" /> .md
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleExport('json')} className="justify-start w-full">
                                    <FileJson className="h-3 w-3 mr-2" /> .json
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col">
                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    placeholder="Start crafting your prompt here...&#10;&#10;Tip: Use templates and power phrases from the sidebars to enhance your prompts!"
                    className="flex-1 min-h-[400px] text-base leading-relaxed p-6 resize-none font-mono"
                />
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Characters:</span>
                        <span className="text-sm font-medium">{charCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Words:</span>
                        <span className="text-sm font-medium">{wordCount.toLocaleString()}</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Check className="h-3 w-3" /> Auto-saved
                </div>
            </div>
        </div>
    );
}
