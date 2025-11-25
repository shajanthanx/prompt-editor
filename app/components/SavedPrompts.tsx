'use client';

import { useState, useEffect } from 'react';
import { Prompt } from '../types';
import { getSavedPrompts, savePrompt, deletePrompt, exportAllData } from '../utils/storage';

interface SavedPromptsProps {
    onPromptLoad: (content: string) => void;
    currentContent: string;
}

export default function SavedPrompts({ onPromptLoad, currentContent }: SavedPromptsProps) {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [promptTitle, setPromptTitle] = useState('');

    useEffect(() => {
        loadPrompts();
    }, []);

    const loadPrompts = () => {
        setPrompts(getSavedPrompts());
    };

    const handleSavePrompt = () => {
        if (!currentContent.trim()) {
            alert('Cannot save an empty prompt');
            return;
        }

        if (!promptTitle.trim()) {
            alert('Please provide a title for the prompt');
            return;
        }

        const prompt: Prompt = {
            id: `prompt-${Date.now()}`,
            title: promptTitle,
            content: currentContent,
            timestamp: Date.now(),
        };

        savePrompt(prompt);
        setPromptTitle('');
        setShowSaveDialog(false);
        loadPrompts();
    };

    const handleDeletePrompt = (id: string) => {
        if (confirm('Are you sure you want to delete this prompt?')) {
            deletePrompt(id);
            loadPrompts();
        }
    };

    const handleExportAll = () => {
        const data = exportAllData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `prompter-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const filteredPrompts = prompts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString();
    };

    return (
        <div className="flex flex-col gap-md" style={{ height: '100%' }}>
            {/* Header */}
            <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>💾 Saved Prompts</h3>
                    <button
                        onClick={() => setShowSaveDialog(!showSaveDialog)}
                        className="btn btn-primary btn-icon"
                        title="Save current prompt"
                    >
                        +
                    </button>
                </div>
                <p className="text-xs text-muted">Your prompt library</p>
            </div>

            {/* Save Dialog */}
            {showSaveDialog && (
                <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                    <h4 style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>Save Current Prompt</h4>
                    <div className="flex flex-col gap-sm">
                        <input
                            type="text"
                            placeholder="Prompt title"
                            value={promptTitle}
                            onChange={(e) => setPromptTitle(e.target.value)}
                            style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
                            autoFocus
                        />
                        <div className="flex gap-sm">
                            <button onClick={handleSavePrompt} className="btn btn-primary" style={{ flex: 1 }}>
                                Save
                            </button>
                            <button onClick={() => setShowSaveDialog(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <input
                type="search"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
            />

            {/* Prompts List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
            }}>
                {filteredPrompts.length === 0 ? (
                    <div className="card" style={{
                        padding: 'var(--spacing-xl)',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                    }}>
                        <p className="text-sm">
                            {searchQuery ? 'No prompts found' : 'No saved prompts yet'}
                        </p>
                        <p className="text-xs" style={{ marginTop: 'var(--spacing-xs)' }}>
                            {!searchQuery && 'Save your first prompt to get started'}
                        </p>
                    </div>
                ) : (
                    filteredPrompts.map(prompt => (
                        <div
                            key={prompt.id}
                            className="card card-interactive"
                            style={{ padding: 'var(--spacing-md)' }}
                        >
                            <div className="flex items-start justify-between gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                <h4 className="truncate" style={{ fontSize: '0.875rem', fontWeight: 600, flex: 1 }}>
                                    {prompt.title}
                                </h4>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePrompt(prompt.id);
                                    }}
                                    className="btn btn-ghost btn-icon"
                                    style={{ padding: '0.25rem', fontSize: '0.75rem' }}
                                    title="Delete prompt"
                                >
                                    🗑️
                                </button>
                            </div>

                            <p className="text-xs text-muted truncate" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                {prompt.content.substring(0, 100)}...
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted">{formatDate(prompt.timestamp)}</span>
                                <button
                                    onClick={() => onPromptLoad(prompt.content)}
                                    className="btn btn-secondary"
                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                                >
                                    Load
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Export Button */}
            {prompts.length > 0 && (
                <button
                    onClick={handleExportAll}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                >
                    📥 Export All Data
                </button>
            )}
        </div>
    );
}
