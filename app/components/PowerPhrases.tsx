'use client';

import { useState, useEffect } from 'react';
import { PowerPhrase } from '../types';
import { defaultPowerPhrases } from '../data/defaultPowerPhrases';
import { getCustomPowerPhrases, savePowerPhrase, deletePowerPhrase } from '../utils/storage';

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
        { id: 'All', label: 'All', icon: '📚' },
        { id: 'reasoning', label: 'Reasoning', icon: '🧠' },
        { id: 'role', label: 'Role', icon: '🎭' },
        { id: 'format', label: 'Format', icon: '📋' },
        { id: 'quality', label: 'Quality', icon: '⭐' },
        { id: 'general', label: 'General', icon: '💡' },
        { id: 'custom', label: 'Custom', icon: '✨' },
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
        <div className="flex flex-col gap-md" style={{ height: '100%' }}>
            {/* Header */}
            <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>⚡ Power Phrases</h3>
                    <button
                        onClick={() => setShowNewPhrase(!showNewPhrase)}
                        className="btn btn-primary btn-icon"
                        title="Add custom phrase"
                    >
                        +
                    </button>
                </div>
                <p className="text-xs text-muted">Quick snippets to enhance prompts</p>
            </div>

            {/* New Phrase Form */}
            {showNewPhrase && (
                <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                    <h4 style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>New Power Phrase</h4>
                    <div className="flex flex-col gap-sm">
                        <textarea
                            placeholder="Enter your power phrase"
                            value={newPhrase.text}
                            onChange={(e) => setNewPhrase({ ...newPhrase, text: e.target.value })}
                            rows={3}
                            style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
                        />
                        <select
                            value={newPhrase.category}
                            onChange={(e) => setNewPhrase({ ...newPhrase, category: e.target.value })}
                            style={{
                                padding: 'var(--spacing-sm)',
                                fontSize: '0.875rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            <option value="custom">Custom</option>
                            <option value="reasoning">Reasoning</option>
                            <option value="role">Role</option>
                            <option value="format">Format</option>
                            <option value="quality">Quality</option>
                            <option value="general">General</option>
                        </select>
                        <div className="flex gap-sm">
                            <button onClick={handleSaveNewPhrase} className="btn btn-primary" style={{ flex: 1 }}>
                                Save
                            </button>
                            <button onClick={() => setShowNewPhrase(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Category Filter */}
            <div style={{
                display: 'flex',
                gap: 'var(--spacing-xs)',
                flexWrap: 'wrap',
            }}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={selectedCategory === cat.id ? 'badge badge-primary' : 'badge'}
                        style={{
                            cursor: 'pointer',
                            background: selectedCategory === cat.id ? undefined : 'var(--bg-elevated)',
                            color: selectedCategory === cat.id ? undefined : 'var(--text-secondary)',
                        }}
                    >
                        {cat.icon} {cat.label}
                    </button>
                ))}
            </div>

            {/* Phrases List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-xs)',
            }}>
                {filteredPhrases.map(phrase => (
                    <div
                        key={phrase.id}
                        className="card card-interactive"
                        style={{
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            cursor: 'pointer',
                        }}
                        onClick={() => onPhraseSelect(phrase.text)}
                    >
                        <div className="flex items-start justify-between gap-sm">
                            <p className="text-sm" style={{ flex: 1 }}>
                                {phrase.text}
                            </p>
                            {phrase.isCustom && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePhrase(phrase.id);
                                    }}
                                    className="btn btn-ghost btn-icon"
                                    style={{ padding: '0.25rem', fontSize: '0.75rem' }}
                                    title="Delete phrase"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                        {phrase.description && (
                            <p className="text-xs text-muted" style={{ marginTop: 'var(--spacing-xs)' }}>
                                {phrase.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
