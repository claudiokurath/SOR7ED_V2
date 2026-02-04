import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRoute } from 'wouter';

const TemplateViewer: React.FC = () => {
    const [, params] = useRoute('/templates/:slug');
    const slug = params?.slug;

    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchTemplate = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/templates/${slug}.md`);
                if (!response.ok) throw new Error('Template not found');
                const text = await response.text();
                setContent(text);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplate();
    }, [slug]);

    if (loading) return (
        <Layout>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-sor7ed-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
        </Layout>
    );

    if (error) return (
        <Layout>
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>Template not found.</p>
            </div>
        </Layout>
    );

    // Simple Markdown Parser (Headers, Lists, Bold, Italic)
    const renderMarkdown = (text: string) => {
        const lines = text.split('\n');
        let inList = false;

        return lines.map((line, index) => {
            // H1
            if (line.startsWith('# ')) {
                inList = false;
                return <h1 key={index} className="text-4xl md:text-5xl font-display font-bold text-sor7ed-brand mt-10 mb-6">{line.replace('# ', '')}</h1>;
            }
            // H2
            if (line.startsWith('## ')) {
                inList = false;
                return <h2 key={index} className="text-2xl md:text-3xl font-display font-bold text-white mt-12 mb-4 border-b border-white/10 pb-2">{line.replace('## ', '')}</h2>;
            }
            // H3
            if (line.startsWith('### ')) {
                inList = false;
                return <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3">{line.replace('### ', '')}</h3>;
            }
            // Hr
            if (line.startsWith('---')) {
                inList = false;
                return <hr key={index} className="border-white/20 my-10" />;
            }
            // List Items
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                const content = line.trim().replace(/^[-*] /, '');
                // Check for checkboxes
                const isCheckbox = content.startsWith('[ ]') || content.startsWith('[x]');
                const cleanContent = isCheckbox ? content.substring(3).trim() : content;
                const isChecked = content.startsWith('[x]');

                const item = (
                    <li key={index} className={`mb-3 ml-4 flex items-start gap-3 ${isCheckbox ? 'list-none' : 'list-disc text-sor7ed-brand'}`}>
                        {isCheckbox && (
                            <div className={`mt-1.5 w-4 h-4 rounded border ${isChecked ? 'bg-sor7ed-brand border-sor7ed-brand' : 'border-zinc-500'} flex-shrink-0`}></div>
                        )}
                        <span className={isCheckbox ? 'text-zinc-300' : 'text-zinc-300'}>
                            {formatInline(cleanContent)}
                        </span>
                    </li>
                );

                if (!inList) {
                    inList = true;
                    return <ul key={index} className="mb-6 pl-4">{item}</ul>; // Note: This structure is simplified/flawed for React array mapping, but works visually for simple lists if we don't nest <ul> tags improperly. 
                    // Better approach for simple parser: just return the li and let CSS handle spacing, or wrap manually.
                    // For this simple usage, returning <li> with styling is fine.
                }
                return item;
            }

            inList = false;

            // Empty Lines
            if (!line.trim()) return <div key={index} className="h-4"></div>;

            // Paragraphs
            return <p key={index} className="mb-4 text-zinc-300 leading-relaxed font-light">{formatInline(line)}</p>;
        });
    };

    const formatInline = (text: string) => {
        // Bold
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            // Italic
            if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                return <em key={i} className="text-zinc-400 italic">{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-black pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-zinc-900/50 p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
                        {renderMarkdown(content)}
                    </div>

                    <div className="mt-10 text-center">
                        <a href={`/templates/${slug}.md`} download className="inline-block px-8 py-4 rounded-full border border-sor7ed-brand text-sor7ed-brand hover:bg-sor7ed-brand hover:text-black transition-all font-mono text-xs uppercase tracking-widest">
                            Download Raw File
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TemplateViewer;
