'use client';

import { useState, useEffect, useRef } from 'react';
import {
    FileText,
    Home,
    Eye,
    Download,
    Moon,
    Sun,
    Edit3,
    Maximize2,
    Columns,
    FileDown,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../components/ThemeToggle';
import { cn } from '@/lib/utils';

// Dynamic script loader
const useScript = (url: string) => {
    const [status, setStatus] = useState(url ? 'loading' : 'idle');

    useEffect(() => {
        if (!url) {
            setStatus('idle');
            return;
        }

        let script = document.querySelector(`script[src="${url}"]`) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.setAttribute('data-status', 'loading');
            document.body.appendChild(script);

            const setAttributeFromEvent = (event: Event) => {
                script.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
                setStatus(event.type === 'load' ? 'ready' : 'error');
            };

            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);
        } else {
            setStatus(script.getAttribute('data-status') as string || 'loading');
        }

        const setStateFromEvent = (event: Event) => {
            setStatus(event.type === 'load' ? 'ready' : 'error');
        };

        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);

        return () => {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [url]);

    return status;
};

const DEFAULT_MARKDOWN = `# Welcome to Markdown Converter

## 1. Overall Summary

### Purpose and Function
**What it is:**
\`Markdown to PDF\` is a utility module designed to convert your markdown documents into professional, multi-page PDF files with smart page breaks and custom styling.

**How it works:**
Simply type your markdown in the editor, see it rendered in the live preview, and click Export PDF to download it.

### Key Features
* **High Resolution:** Uses 2x scaling for crisp text.
* **Smart Paging:** Prevents cutting headers and code blocks in half.
* **Theme Aware:** Toggle between dark and light modes for the UI.

---

## 2. Technical Details

> **Note:** The preview uses a simulated paper view to give you an accurate representation of the final PDF output.

\`\`\`javascript
const handleExport = () => {
  const opt = {
    margin: [15, 15, 15, 15],
    filename: 'document.pdf',
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
  html2pdf().set(opt).from(element).save();
};
\`\`\`
`;

export default function MarkdownToPdfPage() {
    // Load external libraries
    const markedStatus = useScript('https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.2/marked.min.js');
    const html2pdfStatus = useScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');

    // State
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
    const [htmlContent, setHtmlContent] = useState('');
    const [fileName, setFileName] = useState('document');
    const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
    const [isExporting, setIsExporting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Refs
    const previewRef = useRef<HTMLDivElement>(null);

    // Sync dark mode state with document
    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    // Update HTML when markdown changes or marked library loads
    useEffect(() => {
        // @ts-ignore
        if (markedStatus === 'ready' && window.marked) {
            // @ts-ignore
            window.marked.setOptions({
                breaks: true,
                gfm: true,
            });
            // @ts-ignore
            setHtmlContent(window.marked.parse(markdown));
        }
    }, [markdown, markedStatus]);

    // Handle PDF Export
    const handleExportPdf = () => {
        // @ts-ignore
        if (html2pdfStatus !== 'ready' || !window.html2pdf || !previewRef.current) return;

        setIsExporting(true);

        const element = previewRef.current;

        const opt = {
            margin: [15, 15, 15, 15],
            filename: `${fileName || 'document'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Ensure PDF is always white background with black text regardless of theme
        element.classList.add('pdf-export');

        // @ts-ignore
        window.html2pdf().set(opt).from(element).save().then(() => {
            element.classList.remove('pdf-export');
            setIsExporting(false);
        }).catch((err: any) => {
            console.error('PDF Export Error:', err);
            element.classList.remove('pdf-export');
            setIsExporting(false);
        });
    };

    return (
        <div className="flex flex-col h-screen bg-background transition-colors duration-300 overflow-hidden">

            {/* --- HEADER --- */}
            <header className="h-16 flex items-center justify-between px-6 border-b bg-card/80 backdrop-blur-md border-border z-20 shrink-0">

                {/* Left: Branding */}
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Home size={20} />
                        </Button>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/20">
                            <FileText size={24} />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-bold text-lg leading-tight text-foreground">Markdown to PDF</h1>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Utility Module</p>
                        </div>
                    </div>
                </div>

                {/* Center: View Toggles */}
                <div className="hidden md:flex items-center p-1 rounded-lg border border-border bg-muted/50">
                    <button
                        onClick={() => setViewMode('editor')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all",
                            viewMode === 'editor'
                                ? "bg-background text-primary shadow-sm font-medium"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Edit3 size={14} /> Editor
                    </button>
                    <button
                        onClick={() => setViewMode('split')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all",
                            viewMode === 'split'
                                ? "bg-background text-primary shadow-sm font-medium"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Columns size={14} /> Split
                    </button>
                    <button
                        onClick={() => setViewMode('preview')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all",
                            viewMode === 'preview'
                                ? "bg-background text-primary shadow-sm font-medium"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Maximize2 size={14} /> Preview
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center bg-muted/30 border border-border rounded-md px-3 py-1.5 gap-2">
                        <FileDown size={14} className="text-muted-foreground" />
                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="bg-transparent border-none focus:outline-none text-sm text-foreground w-24 xl:w-40 placeholder:text-muted-foreground"
                            placeholder="document"
                        />
                        <span className="text-muted-foreground text-xs">.pdf</span>
                    </div>

                    <Button
                        onClick={handleExportPdf}
                        disabled={isExporting || html2pdfStatus !== 'ready'}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/10 disabled:bg-primary/50"
                    >
                        {isExporting ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Converting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Download size={16} /> Export PDF
                            </span>
                        )}
                    </Button>

                    <div className="w-px h-8 bg-border mx-1 hidden sm:block"></div>

                    <ThemeToggle />
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex overflow-hidden">

                {/* Editor Pane */}
                {(viewMode === 'editor' || viewMode === 'split') && (
                    <MarkdownEditor
                        value={markdown}
                        onChange={setMarkdown}
                        viewMode={viewMode}
                    />
                )}

                {/* Preview Pane */}
                {(viewMode === 'preview' || viewMode === 'split') && (
                    <MarkdownPreview
                        ref={previewRef}
                        htmlContent={htmlContent}
                    />
                )}
            </main>
        </div>
    );
}
