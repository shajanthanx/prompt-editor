'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Search } from 'lucide-react';
import { Template } from '../types';
import { defaultTemplates } from '../data/defaultTemplates';
import { getCustomTemplates, saveTemplate, deleteTemplate } from '../utils/storage';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
        <div className="flex flex-col h-full gap-4">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5" /> Templates
                    </h3>
                    <Button
                        size="icon"
                        onClick={() => setShowNewTemplate(!showNewTemplate)}
                        title="Create new template"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">Pre-built prompts for common tasks</p>
            </div>

            {/* New Template Form */}
            {showNewTemplate && (
                <Card>
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">New Template</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2 flex flex-col gap-2">
                        <Input
                            placeholder="Template name"
                            value={newTemplate.name}
                            onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        />
                        <Input
                            placeholder="Category (optional)"
                            value={newTemplate.category}
                            onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                        />
                        <Textarea
                            placeholder="Template content"
                            value={newTemplate.content}
                            onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                            rows={4}
                        />
                        <div className="flex gap-2 mt-2">
                            <Button onClick={handleSaveNewTemplate} className="flex-1">
                                Save
                            </Button>
                            <Button variant="secondary" onClick={() => setShowNewTemplate(false)} className="flex-1">
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
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="h-7 text-xs px-2"
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {/* Templates List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {filteredTemplates.map(template => (
                    <Card key={template.id} className="group hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-semibold">{template.name}</h4>
                                {template.isCustom && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTemplate(template.id);
                                        }}
                                        title="Delete template"
                                    >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium">
                                    {template.category}
                                </span>
                                {template.isCustom && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 font-medium">
                                        Custom
                                    </span>
                                )}
                            </div>
                            {template.description && (
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                    {template.description}
                                </p>
                            )}
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full h-8 text-xs"
                                onClick={() => onTemplateSelect(template.content)}
                            >
                                Use Template
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
