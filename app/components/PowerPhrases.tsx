'use client';

import { useState, useEffect } from 'react';
import { Plus, Sparkles, Trash2, Book, Brain, User, Clipboard, Star, Lightbulb } from 'lucide-react';
import { PowerPhrase } from '../types';
import { defaultPowerPhrases } from '../data/defaultPowerPhrases';
import { getCustomPowerPhrases, savePowerPhrase, deletePowerPhrase } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PowerPhrasesProps {
    onPhraseSelect: (text: string) => void;
}

export default function PowerPhrases({ onPhraseSelect }: PowerPhrasesProps) {
    const [phrases, setPhrases] = useState<PowerPhrase[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [showNewPhrase, setShowNewPhrase] = useState(false);
    const [newPhrase, setNewPhrase] = useState({ text: '', category: 'custom' });

    useEffect(() => {
        loadPhrases();
    }, []);

    const loadPhrases = () => {
        const custom = getCustomPowerPhrases();
        setPhrases([...defaultPowerPhrases, ...custom]);
    };

    const categories = [
        { id: 'All', label: 'All', icon: Book },
        { id: 'reasoning', label: 'Reasoning', icon: Brain },
        { id: 'role', label: 'Role', icon: User },
        { id: 'format', label: 'Format', icon: Clipboard },
        { id: 'quality', label: 'Quality', icon: Star },
        { id: 'general', label: 'General', icon: Lightbulb },
        { id: 'custom', label: 'Custom', icon: Sparkles },
    ];

    const filteredPhrases = selectedCategory === 'All'
        ? phrases
        : phrases.filter(p => p.category === selectedCategory);

    const handleSaveNewPhrase = () => {
        if (!newPhrase.text) {
            alert('Please provide text for the power phrase');
            return;
        }

        const phrase: PowerPhrase = {
            id: `custom-${Date.now()}`,
            text: newPhrase.text,
            category: newPhrase.category,
            isCustom: true,
        };

        savePowerPhrase(phrase);
        setNewPhrase({ text: '', category: 'custom' });
        setShowNewPhrase(false);
        loadPhrases();
    };

    const handleDeletePhrase = (id: string) => {
        if (confirm('Are you sure you want to delete this power phrase?')) {
            deletePowerPhrase(id);
            loadPhrases();
        }
    };

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5" /> Power Phrases
                    </h3>
                    <Button
                        size="icon"
                        onClick={() => setShowNewPhrase(!showNewPhrase)}
                        title="Add custom phrase"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">Quick snippets to enhance prompts</p>
            </div>

            {/* New Phrase Form */}
            {showNewPhrase && (
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">New Power Phrase</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex flex-col gap-2">
                        <Textarea
                            placeholder="Enter your power phrase"
                            value={newPhrase.text}
                            onChange={(e) => setNewPhrase({ ...newPhrase, text: e.target.value })}
                            rows={3}
                        />
                        <select
                            value={newPhrase.category}
                            onChange={(e) => setNewPhrase({ ...newPhrase, category: e.target.value })}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="custom">Custom</option>
                            <option value="reasoning">Reasoning</option>
                            <option value="role">Role</option>
                            <option value="format">Format</option>
                            <option value="quality">Quality</option>
                            <option value="general">General</option>
                        </select>
                        <div className="flex gap-2 mt-2">
                            <Button onClick={handleSaveNewPhrase} className="flex-1">
                                Save
                            </Button>
                            <Button variant="secondary" onClick={() => setShowNewPhrase(false)} className="flex-1">
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1">
                {categories.map(cat => (
                    <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat.id)}
                        className="h-7 text-xs px-2"
                    >
                        <cat.icon className="mr-1 h-3 w-3" /> {cat.label}
                    </Button>
                ))}
            </div>

            {/* Phrases List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {filteredPhrases.map(phrase => (
                    <Card
                        key={phrase.id}
                        className="group hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => onPhraseSelect(phrase.text)}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm flex-1">
                                    {phrase.text}
                                </p>
                                {phrase.isCustom && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeletePhrase(phrase.id);
                                        }}
                                        title="Delete phrase"
                                    >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                )}
                            </div>
                            {phrase.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    {phrase.description}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
