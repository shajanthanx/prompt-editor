'use client';

import { useState, useEffect } from 'react';
import { Template } from '../types';
import { defaultTemplates } from '../data/defaultTemplates';
import { getCustomTemplates, saveTemplate, deleteTemplate } from '../utils/storage';

interface TemplateLibraryProps {
    onTemplateSelect: (content: string) => void;
}

export default function TemplateLibrary({ onTemplateSelect }: TemplateLibraryProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [showNewTemplate, setShowNewTemplate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', category: '', content: '' });

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = () => {
        const custom = getCustomTemplates();
        setTemplates([...defaultTemplates, ...custom]);
    };

    const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

    const filteredTemplates = selectedCategory === 'All'
        ? templates
        : templates.filter(t => t.category === selectedCategory);

    const handleSaveNewTemplate = () => {
        if (!newTemplate.name || !newTemplate.content) {
            alert('Please provide a name and content for the template');
            return;
        }

        const template: Template = {
            id: `custom-${Date.now()}`,
            name: newTemplate.name,
            category: newTemplate.category || 'Custom',
            content: newTemplate.content,
            isCustom: true,
        };

        saveTemplate(template);
        setNewTemplate({ name: '', category: '', content: '' });
        setShowNewTemplate(false);
        loadTemplates();
    };

    const handleDeleteTemplate = (id: string) => {
        if (confirm('Are you sure you want to delete this template?')) {
            deleteTemplate(id);
            loadTemplates();
        }
    };

    return (
        <div className="flex flex-col gap-md" style={{ height: '100%' }}>
            {/* Header */}
            <div>
                <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>📝 Templates</h3>
                    <button
                        onClick={() => setShowNewTemplate(!showNewTemplate)}
                        className="btn btn-primary btn-icon"
                        title="Create new template"
                    >
                        +
                    </button>
                </div>
                <p className="text-xs text-muted">Pre-built prompts for common tasks</p>
            </div>

            {/* New Template Form */}
            {showNewTemplate && (
                <div className="card" style={{ padding: 'var(--spacing-md)' }}>
                    <h4 style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-sm)' }}>New Template</h4>
                    <div className="flex flex-col gap-sm">
                        <input
                            type="text"
                            placeholder="Template name"
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                            style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
                        />
                        <input
                            type="text"
                            placeholder="Category (optional)"
                            value={newTemplate.category}
                            onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                            style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
                        />
                        <textarea
                            placeholder="Template content"
                            value={newTemplate.content}
                            onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                            rows={4}
                            style={{ padding: 'var(--spacing-sm)', fontSize: '0.875rem' }}
                        />
                        <div className="flex gap-sm">
                            <button onClick={handleSaveNewTemplate} className="btn btn-primary" style={{ flex: 1 }}>
                                Save
                            </button>
                            <button onClick={() => setShowNewTemplate(false)} className="btn btn-secondary" style={{ flex: 1 }}>
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
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={selectedCategory === cat ? 'badge badge-primary' : 'badge'}
                        style={{
                            cursor: 'pointer',
                            background: selectedCategory === cat ? undefined : 'var(--bg-elevated)',
                            color: selectedCategory === cat ? undefined : 'var(--text-secondary)',
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Templates List */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
            }}>
                {filteredTemplates.map(template => (
                    <div
                        key={template.id}
                        className="card card-interactive"
                        style={{ padding: 'var(--spacing-md)' }}
                    >
                        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xs)' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600 }}>{template.name}</h4>
                            {template.isCustom && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTemplate(template.id);
                                    }}
                                    className="btn btn-ghost btn-icon"
                                    style={{ padding: '0.25rem' }}
                                    title="Delete template"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-sm" style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <span className="badge" style={{ fontSize: '0.7rem' }}>{template.category}</span>
                            {template.isCustom && (
                                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Custom</span>
                            )}
                        </div>
                        {template.description && (
                            <p className="text-xs text-muted" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                {template.description}
                            </p>
                        )}
                        <button
                            onClick={() => onTemplateSelect(template.content)}
                            className="btn btn-secondary"
                            style={{ width: '100%', fontSize: '0.8rem' }}
                        >
                            Use Template
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
