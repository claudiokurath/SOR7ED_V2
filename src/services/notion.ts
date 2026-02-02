export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    branch: string;
    date: string;
    image: string;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    // Return robust mock data immediately to fix "broken" look
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
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    // Mock data matching the list
    const MOCK_POSTS: Record<string, BlogPost> = {
        'dopamine-menu': {
            id: '1', slug: 'dopamine-menu', title: 'THE DOPAMINE MENU', branch: 'MIND', date: 'Jan 28',
            excerpt: 'How to stimulate your brain without burning out.',
            image: 'https://images.unsplash.com/photo-1555685812-4b943f3e9b41?q=80&w=800&auto=format&fit=crop'
        },
        'digital-declutter': {
            id: '2', slug: 'digital-declutter', title: 'DIGITAL DECLUTTER', branch: 'TECH', date: 'Feb 02',
            excerpt: 'Why your desktop is giving you anxiety.',
            image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800&auto=format&fit=crop'
        },
        'financial-zen': {
            id: '3', slug: 'financial-zen', title: 'FINANCIAL ZEN', branch: 'WEALTH', date: 'Feb 10',
            excerpt: 'Automating your bills.',
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop'
        }
    };

    return MOCK_POSTS[slug] || null;
};

export const fetchPageBlocks = async () => {
    // Return mock blocks
    return [
        {
            id: 'b1',
            type: 'heading_1',
            heading_1: {
                rich_text: [{ type: 'text', text: { content: 'Introduction' } }]
            }
        },
        {
            id: 'b2',
            type: 'paragraph',
            paragraph: {
                rich_text: [{ type: 'text', text: { content: 'This is a demo article. The real content will serve directly from your Notion database once connected. For now, enjoy this placeholder text about systems and sorting your life.' } }]
            }
        },
        {
            id: 'b3',
            type: 'paragraph',
            paragraph: {
                rich_text: [{ type: 'text', text: { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' } }]
            }
        }
    ];
}
