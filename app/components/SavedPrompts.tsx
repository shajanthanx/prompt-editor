'use client';

import { useState, useEffect } from 'react';
import { Save, Trash2, Download, Search, Clock, ArrowRight } from 'lucide-react';
import { Prompt } from '../types';
import { getSavedPrompts, savePrompt, deletePrompt, exportAllData } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Save className="h-5 w-5" /> Saved Prompts
                    </h3>
                    <Button
                        size="icon"
                        onClick={() => setShowSaveDialog(!showSaveDialog)}
                        title="Save current prompt"
                    >
                        <Save className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">Your prompt library</p>
            </div>

            {/* Save Dialog */}
            {showSaveDialog && (
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Save Current Prompt</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex flex-col gap-2">
                        <Input
                            placeholder="Prompt title"
                            value={promptTitle}
                            onChange={(e) => setPromptTitle(e.target.value)}
                            autoFocus
                        />
                        <div className="flex gap-2 mt-2">
                            <Button onClick={handleSavePrompt} className="flex-1">
                                Save
                            </Button>
                            <Button variant="secondary" onClick={() => setShowSaveDialog(false)} className="flex-1">
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Prompts List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {filteredPrompts.length === 0 ? (
                    <Card className="p-8 text-center text-muted-foreground border-dashed">
                        <p className="text-sm">
                            {searchQuery ? 'No prompts found' : 'No saved prompts yet'}
                        </p>
                        <p className="text-xs mt-1">
                            {!searchQuery && 'Save your first prompt to get started'}
                        </p>
                    </Card>
                ) : (
                    filteredPrompts.map(prompt => (
                        <Card key={prompt.id} className="group hover:border-primary/50 transition-colors">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm font-semibold truncate flex-1">
                                        {prompt.title}
                                    </h4>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeletePrompt(prompt.id);
                                        }}
                                        title="Delete prompt"
                                    >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                </div>

                                <p className="text-xs text-muted-foreground truncate mb-3">
                                    {prompt.content.substring(0, 100)}...
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {formatDate(prompt.timestamp)}
                                    </span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-7 text-xs px-2"
                                        onClick={() => onPromptLoad(prompt.content)}
                                    >
                                        Load <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Export Button */}
            {prompts.length > 0 && (
                <Button
                    variant="outline"
                    onClick={handleExportAll}
                    className="w-full"
                >
                    <Download className="h-4 w-4 mr-2" /> Export All Data
                </Button>
            )}
        </div>
    );
}
