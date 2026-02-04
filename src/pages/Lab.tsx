import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'wouter';

import { fetchBlogPosts, type BlogPost } from '../services/notion';

const Lab: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string | null>(null);

    React.useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const data = await fetchBlogPosts();
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
    }, []);

    const branches = Array.from(new Set(posts.map(p => p.branch)));
    const filteredPosts = filter ? posts.filter(p => p.branch === filter) : posts;

    return (
        <Layout>
            <div className="bg-black min-h-screen pt-24">
                <div className="px-6 py-20">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">THE LAB</p>
                            <h1 className="font-display font-bold text-5xl md:text-7xl text-white uppercase mb-6">EXPERIMENTS</h1>
                            <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                                Exploring systems, automation, and mindset shifts for the neurodivergent brain.
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="mb-20 text-center">
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => setFilter(null)}
                                    className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-mono border transition-all ${!filter ? 'bg-white text-black border-white' : 'text-zinc-500 border-white/10 hover:border-white hover:text-white'}`}
                                >
                                    ALL
                                </button>
                                {branches.map(b => (
                                    <button
                                        key={b}
                                        onClick={() => setFilter(b)}
                                        className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-mono border transition-all ${filter === b ? 'bg-sor7ed-brand text-black border-sor7ed-brand' : 'text-zinc-500 border-white/10 hover:border-sor7ed-brand hover:text-white'}`}
                                    >
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-8 h-8 border-4 border-sor7ed-brand border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="lab-cards">
                                {filteredPosts.map((post) => (
                                    <Link key={post.slug} href={`/lab/${post.slug}`} className="block group h-full text-decoration-none">
                                        <div className="lab-card h-full">
                                            {/* Image Section */}
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="lab-card-image"
                                            />

                                            {/* Text Section */}
                                            <div className="lab-card-content flex flex-col h-full text-center">
                                                <div className="lab-card-meta justify-center">
                                                    <span>{post.branch}</span>
                                                    <span>{post.date}</span>
                                                </div>
                                                <h3 className="lab-card-title group-hover:text-sor7ed-brand transition-colors uppercase">{post.title}</h3>
                                                <p className="lab-card-description mb-6 line-clamp-3">{post.excerpt}</p>

                                                <div className="mt-auto text-xs font-bold uppercase tracking-widest text-sor7ed-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    READ ARTICLE <span>→</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Lab;
