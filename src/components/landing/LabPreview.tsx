import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { fetchBlogPosts, type BlogPost } from '../../services/notion';

const LabPreview: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const data = await fetchBlogPosts();
            // Show only first 3 posts in preview
            setPosts(data.slice(0, 3));
            setLoading(false);
        };
        loadPosts();
    }, []);

    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">THE LAB</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-white uppercase">LATEST EXPERIMENTS</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-sor7ed-brand border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="lab-cards">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/lab/${post.slug}`} className="lab-card group no-underline">
                                <div
                                    className="lab-card-image bg-cover bg-center"
                                    style={{ backgroundImage: `url(${post.image})` }}
                                />
                                <div className="lab-card-content text-center">
                                    <div className="lab-card-meta justify-center">
                                        <span className="text-sor7ed-brand">{post.branch}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="lab-card-title group-hover:text-sor7ed-brand transition-colors duration-300 uppercase">
                                        {post.title}
                                    </h3>
                                    <p className="lab-card-description line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/lab" className="inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-mono">
                        VIEW ALL EXPERIMENTS
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default LabPreview;
