'use client';

import { PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    viewMode: 'split' | 'editor' | 'preview';
}

export default function MarkdownEditor({ value, onChange, viewMode }: MarkdownEditorProps) {
    return (
        <div className={cn(
            "flex flex-col border-border transition-all duration-300 overflow-hidden bg-card",
            viewMode === 'split' ? 'w-1/2 border-r' : 'w-full'
        )}>
            {/* Editor Toolbar */}
            <div className="h-10 flex items-center justify-between px-4 border-b border-border bg-muted/50 shrink-0">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <PenTool size={12} /> Markdown Editor
                </div>
            </div>

            {/* Editor Area */}
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 p-6 resize-none focus:outline-none font-mono text-sm leading-relaxed bg-transparent text-foreground custom-scrollbar"
                spellCheck="false"
                placeholder="Type your markdown here..."
            />
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--muted-foreground); opacity: 0.3; border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); opacity: 0.5; }
            `}</style>
        </div>
    );
}
