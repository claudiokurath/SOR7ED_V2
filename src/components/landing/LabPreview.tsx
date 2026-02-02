import React, { useState } from 'react';
import { Link } from 'wouter';

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    branch: string;
    date: string;
    image: string;
}

const LabPreview: React.FC = () => {
    const [posts] = useState<BlogPost[]>([
        { slug: 'dopamine-menu', title: "The Dopamine Menu", excerpt: "How to stimulate your brain without burning out.", branch: "Mind", date: "Jan 28", image: "https://picsum.photos/seed/dopamine/400/500?grayscale" },
        { slug: 'body-doubling', title: "Body Doubling", excerpt: "The science of shared presence.", branch: "Focus", date: "Jan 15", image: "https://picsum.photos/seed/bodydouble/400/500?grayscale" },
        { slug: 'email-zero', title: "Inbox Zero Trap", excerpt: "Why aiming for empty is killing your productivity.", branch: "Tech", date: "Jan 02", image: "https://picsum.photos/seed/email/400/500?grayscale" },
    ]);

    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
                    <div>
                        <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">The Lab</p>
                        <h2 className="font-display font-bold text-5xl md:text-7xl text-white">Latest Experiments</h2>
                    </div>
                    <Link href="/lab" className="hidden md:inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-mono">
                        View All Experiments
                    </Link>
                </div>

                <div className="lab-cards">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/lab/${post.slug}`} className="lab-card group no-underline">
                            <div
                                className="lab-card-image bg-cover bg-center"
                                style={{ backgroundImage: `url(${post.image})` }}
                            />
                            <div className="lab-card-content">
                                <div className="lab-card-meta">
                                    <span className="text-sor7ed-brand">{post.branch}</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="lab-card-title group-hover:text-sor7ed-brand transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="lab-card-description line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/lab" className="inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-mono">
                        View All Experiments
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default LabPreview;
