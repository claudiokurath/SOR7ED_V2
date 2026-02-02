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
            <div className="bg-black min-h-screen">
                {/* Hero Section */}
                <div className="relative w-full h-screen overflow-hidden">
                    {/* Background Image - Right aligned */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('${import.meta.env.BASE_URL}assets/lab-hero.png')`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'right center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0 pointer-events-none" />

                    {/* Content - Left aligned */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 relative z-10">
                        <div className="max-w-4xl">
                            <p className="hero-subtitle mb-8 flex items-center gap-2 font-mono text-sm uppercase tracking-widest font-bold">
                                LATEST EXPERIMENTS
                            </p>
                            <h1 className="font-display font-bold text-7xl md:text-[9rem] lg:text-[11rem] text-white mb-8 uppercase leading-[0.8] tracking-tight">The Lab</h1>
                            <p className="font-sans font-light text-zinc-300 text-2xl md:text-3xl max-w-2xl leading-relaxed section-description">
                                Exploring systems, automation, and mindset shifts for the neurodivergent brain.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-20">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="mb-20 text-center">
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => setFilter(null)}
                                    className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-mono border transition-all ${!filter ? 'bg-white text-black border-white' : 'text-zinc-500 border-white/10 hover:border-white hover:text-white'}`}
                                >
                                    All
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
                                            <div className="lab-card-content flex flex-col h-full">
                                                <div className="lab-card-meta">
                                                    <span>{post.branch}</span>
                                                    <span>{post.date}</span>
                                                </div>
                                                <h3 className="lab-card-title group-hover:text-sor7ed-brand transition-colors">{post.title}</h3>
                                                <p className="lab-card-description mb-6 line-clamp-3">{post.excerpt}</p>

                                                <div className="mt-auto text-xs font-bold uppercase tracking-widest text-sor7ed-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    Read Article <span>→</span>
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
