export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    branch: string;
    date: string;
    image: string;
    body?: string;
    cta1?: string;
}

// Use serverless function in production, proxy in development
const API_URL = import.meta.env.DEV
    ? '/api/notion/databases/' + import.meta.env.VITE_NOTION_DATABASE_ID + '/query'
    : '/.netlify/functions/notion-posts';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        if (import.meta.env.DEV) {
            // Development: use Vite proxy
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filter: {
                        property: 'Published',
                        checkbox: {
                            equals: true,
                        },
                    },
                    sorts: [
                        {
                            property: 'Date',
                            direction: 'descending',
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            return data.results.map((page: any) => {
                const properties = page.properties;

                // Get the image from File property
                let image = '';
                if (properties.File?.files?.[0]) {
                    const file = properties.File.files[0];
                    image = file.type === 'external' ? file.external.url : file.file.url;
                }

                // Get title
                const title = properties.Title?.title?.[0]?.plain_text || properties.Name?.title?.[0]?.plain_text || 'Untitled';

                // Get slug
                const slug = properties.Slug?.rich_text?.[0]?.plain_text ||
                            title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                // Get excerpt
                const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text || '';

                // Get branch
                const branch = properties.Branch?.select?.name || properties.Category?.select?.name || 'GENERAL';

                // Get date
                const dateStr = properties.Date?.date?.start || page.created_time;
                const date = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                return {
                    id: page.id,
                    slug,
                    title: title.toUpperCase(),
                    excerpt,
                    branch: branch.toUpperCase(),
                    date,
                    image,
                };
            });
        } else {
            // Production: use Netlify function
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Return fallback data if API fails
        return [
            {
                id: '1',
                slug: 'dopamine-menu',
                title: 'THE DOPAMINE MENU',
                excerpt: 'How to stimulate your brain without burning out. A guide to healthy dopamine sources.',
                branch: 'MIND',
                date: 'Jan 28',
                image: 'https://images.unsplash.com/photo-1555685812-4b943f3e9b41?q=80&w=800&auto=format&fit=crop'
            },
            {
                id: '2',
                slug: 'digital-declutter',
                title: 'DIGITAL DECLUTTER',
                excerpt: 'Why your desktop is giving you anxiety and how to fix it in 15 minutes.',
                branch: 'TECH',
                date: 'Feb 02',
                image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop'
            },
            {
                id: '3',
                slug: 'financial-zen',
                title: 'FINANCIAL ZEN',
                excerpt: 'Automating your bills so you never miss a payment again.',
                branch: 'WEALTH',
                date: 'Feb 10',
                image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop'
            }
        ];
    }
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const posts = await fetchBlogPosts();
    return posts.find(p => p.slug === slug) || null;
};

export const fetchPageBlocks = async (_pageId: string) => {
    // This would need another serverless function to fetch page content
    // For now return placeholder
    return [
        {
            id: 'b1',
            type: 'paragraph',
            paragraph: {
                rich_text: [{ type: 'text', text: { content: 'Content coming soon...' } }]
            }
        }
    ];
};
