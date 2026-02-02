
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRoute, Link } from 'wouter';
import { fetchBlogPostBySlug, fetchPageBlocks, type BlogPost as BlogPostType } from '../services/notion';

const BlogPost: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, params] = useRoute('/lab/:slug');
    const slug = params?.slug;

    const [post, setPost] = useState<BlogPostType | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [blocks, setBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            fetchBlogPostBySlug(slug).then(async (p) => {
                if (p) {
                    setPost(p);
                    const blks = await fetchPageBlocks(p.id);
                    setBlocks(blks);
                }
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return (
        <Layout>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-sor7ed-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
        </Layout>
    );

    if (!post) return <Layout><div className="min-h-screen bg-black text-white p-20 text-center">Post not found</div></Layout>;

    // Basic Block Renderer
    const renderBlock = (block: any) => {
        const { type, id } = block;
        const value = block[type];

        switch (type) {
            case 'paragraph':
                return <p key={id} className="mb-6">{value.rich_text.map((t: any) => t.plain_text).join('')}</p>;
            case 'heading_1':
                return <h1 key={id} className="text-4xl font-bold mt-10 mb-6 text-white">{value.rich_text.map((t: any) => t.plain_text).join('')}</h1>;
            case 'heading_2':
                return <h2 key={id} className="text-3xl font-display mt-10 mb-4 text-white">{value.rich_text.map((t: any) => t.plain_text).join('')}</h2>;
            case 'heading_3':
                return <h3 key={id} className="text-2xl font-bold mt-8 mb-4 text-white">{value.rich_text.map((t: any) => t.plain_text).join('')}</h3>;
            case 'bulleted_list_item':
                return <li key={id} className="mb-2">{value.rich_text.map((t: any) => t.plain_text).join('')}</li>;
            case 'numbered_list_item':
                return <li key={id} className="mb-2 list-decimal">{value.rich_text.map((t: any) => t.plain_text).join('')}</li>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <article className="min-h-screen bg-black text-zinc-300">
                {/* Hero Image */}
                <div className="w-full h-[60vh] relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${post.image})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-20 max-w-5xl mx-auto">
                        <div className="flex gap-6 mb-8 font-mono text-xs uppercase tracking-widest text-sor7ed-brand border-b border-white/10 pb-4 inline-flex">
                            <span>{post.branch}</span>
                            <span className="text-zinc-500">{post.date}</span>
                        </div>
                        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9]">{post.title}</h1>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 py-20 text-lg md:text-xl font-light leading-relaxed">
                    <div className="prose prose-invert prose-lg max-w-none">
                        {blocks.map(renderBlock)}
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link href="/lab" className="text-sm font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">← Back to Lab</Link>
                        <a
                            href={`https://wa.me/447360277713?text=Hi,%20I%20just%20read%20your%20post%20about%20${slug}...`}
                            className="px-8 py-4 rounded-full bg-sor7ed-brand text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(247,198,0,0.3)] hover:shadow-none"
                        >
                            Discuss on WhatsApp
                        </a>
                    </div>
                </div>
            </article>
        </Layout>
    );
};
export default BlogPost;
