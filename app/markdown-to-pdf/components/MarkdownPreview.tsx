'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface MarkdownPreviewProps {
    htmlContent: string;
}

const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(({ htmlContent }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    return (
        <div className="flex-1 flex flex-col bg-secondary/30 transition-all duration-300 overflow-hidden">
            {/* Preview Toolbar */}
            <div className="h-10 flex items-center justify-between px-4 border-b border-border bg-card shrink-0">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Eye size={12} /> Live Preview
                </div>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-500 text-[10px] font-bold uppercase tracking-wide border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    Live
                </span>
            </div>

            {/* Preview Area (Paper Simulation) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                <div
                    ref={internalRef}
                    id="markdown-content"
                    className="max-w-4xl mx-auto min-h-full bg-white shadow-xl rounded-sm p-8 md:p-12 text-slate-800 markdown-body"
                    style={{
                        fontFamily: '"Inter", -apple-system, sans-serif',
                        color: '#1e293b'
                    }}
                >
                    <style jsx global>{`
                        .prose { max-width: none; }
                        /* Typography */
                        .markdown-body h1 { font-size: 2.25em; font-weight: 800; margin-bottom: 0.8em; letter-spacing: -0.025em; line-height: 1.1; color: #111827; border: none; margin-top: 0; }
                        .markdown-body h2 { font-size: 1.5em; font-weight: 700; margin-top: 1.5em; margin-bottom: 0.8em; color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
                        .markdown-body h3 { font-size: 1.25em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.6em; color: #374151; }
                        .markdown-body p { margin-bottom: 1.25em; line-height: 1.75; color: #374151; font-size: 16px; }
                        
                        /* Page Break Fixes */
                        .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, 
                        .markdown-body p, .markdown-body li, .markdown-body blockquote, 
                        .markdown-body pre, .markdown-body img, .markdown-body tr {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                        
                        .markdown-body strong { font-weight: 600; color: #111827; }
                        .markdown-body ul { list-style-type: disc; padding-left: 1.625em; margin-bottom: 1.25em; }
                        .markdown-body ol { list-style-type: decimal; padding-left: 1.625em; margin-bottom: 1.25em; }
                        .markdown-body li { margin-bottom: 0.5em; }
                        .markdown-body blockquote { font-style: italic; border-left: 4px solid #8b5cf6; padding-left: 1em; color: #4b5563; background: #f9fafb; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; margin-bottom: 1.5rem; }
                        .markdown-body code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.375rem; font-size: 0.875em; color: #db2777; }
                        .markdown-body pre { background-color: #1f2937; color: #e5e7eb; padding: 1em; border-radius: 0.5em; overflow-x: auto; margin-bottom: 1.5em; white-space: pre-wrap; word-break: break-all; }
                        .markdown-body pre code { background-color: transparent; color: inherit; padding: 0; font-size: 0.9em; }
                        .markdown-body a { color: #7c3aed; text-decoration: underline; font-weight: 500; }
                        .markdown-body img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 2rem 0; }
                        .markdown-body hr { border-color: #e5e7eb; margin: 3rem 0; border-top: 1px solid #e5e7eb; }
                        .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
                        .markdown-body th { text-align: left; padding: 0.75rem; border-bottom: 2px solid #e5e7eb; font-weight: 600; color: #111827; }
                        .markdown-body td { padding: 0.75rem; border-bottom: 1px solid #e5e7eb; color: #374151; }

                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--muted-foreground); opacity: 0.3; border-radius: 3px; }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); opacity: 0.5; }
                    `}</style>
                    <div
                        className="prose markdown-body"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </div>
        </div>
    );
});

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;
