import React, { useState } from 'react';
import Layout from '../components/Layout';

const MAPPINGS: Record<string, string> = {
    'dopamine-menu': 'dopamine-menu',
    'digital-declutter': 'digital-declutter',
    'financial-zen': 'financial-zen',
    // Fallback for titles
    'THE DOPAMINE MENU': 'dopamine-menu',
    'DIGITAL DECLUTTER': 'digital-declutter',
    'FINANCIAL ZEN': 'financial-zen'
};

const BASE_URL = 'https://planetsorted.com/templates';

const Admin: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const log = (msg: string) => setLogs(prev => [...prev, msg]);

    const runUpdate = async () => {
        setLoading(true);
        setLogs([]);
        log('Starting update...');

        try {
            const dbId = import.meta.env.VITE_NOTION_DATABASE_ID;
            if (!dbId) throw new Error('Database ID missing');

            // 1. Fetch Pages
            const queryRes = await fetch(`/api/notion/databases/${dbId}/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });

            if (!queryRes.ok) throw new Error('Failed to fetch pages');
            const data = await queryRes.json();

            log(`Found ${data.results.length} pages.`);

            // 2. Update Pages
            for (const page of data.results) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const props = (page as any).properties;
                const slug = props.Slug?.rich_text?.[0]?.plain_text;
                const title = props.Title?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text;

                let filename = null;
                if (slug && MAPPINGS[slug]) filename = MAPPINGS[slug];
                else if (title && MAPPINGS[title]) filename = MAPPINGS[title];
                else if (title) {
                    const upper = title.toUpperCase();
                    if (upper.includes('DOPAMINE')) filename = 'dopamine-menu';
                    if (upper.includes('DECLUTTER')) filename = 'digital-declutter';
                    if (upper.includes('FINANCIAL') || upper.includes('ZEN')) filename = 'financial-zen';
                }

                if (filename) {
                    log(`Updating "${title}" -> ${filename}.md`);

                    // Use the markdown file link
                    const fileUrl = `${BASE_URL}/${filename}.md`;

                    const updateRes = await fetch(`/api/notion/pages/${page.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            properties: {
                                'template': {
                                    files: [
                                        {
                                            name: `${filename}.md`,
                                            type: 'external',
                                            external: { url: fileUrl }
                                        }
                                    ]
                                }
                            }
                        })
                    });

                    if (updateRes.ok) log('✅ Success');
                    else {
                        const err = await updateRes.text();
                        log(`❌ Failed: ${err}`);
                    }

                } else {
                    log(`Skipping "${title}"`);
                }
            }

        } catch (err) {
            log(`Error: ${err}`);
        } finally {
            setLoading(false);
            log('Done.');
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-black pt-24 px-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6">Admin Tools</h1>
                    <button
                        onClick={runUpdate}
                        disabled={loading}
                        className="px-6 py-3 bg-sor7ed-brand text-black font-bold uppercase disabled:opacity-50"
                    >
                        {loading ? 'Running...' : 'Update Notion Templates'}
                    </button>

                    <div className="mt-8 bg-zinc-900 p-4 rounded h-96 overflow-auto font-mono text-xs text-green-400">
                        {logs.map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Admin;
