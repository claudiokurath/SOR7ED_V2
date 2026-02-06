import { Link } from 'react-router-dom';
import contentData from '../data/content.json';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    cover?: string;
    branch?: string;
    status: string;
}

const { blog } = contentData as { blog: BlogPost[] };

const stripMarkdown = (text: string) => {
    return text
        .replace(/[#*`_~]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();
};

export default function Blog() {
    const validBlog = blog.filter(b => b.status === 'Published');

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="relative py-48 px-6 border-b border-white/5 bg-black">
                <div className="relative z-20 max-w-5xl mx-auto text-center">
                    <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-8 uppercase leading-[0.85]">
                        The <span className="text-sor7ed-yellow italic">Lab.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-tight">
                        Hard-won insights and practical philosophy for the neurodivergent experience.
                    </p>
                </div>
            </header>

            <section className="py-32 px-6 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {validBlog.map((post) => (
                        <Link to={`/blog/${post.id}`} key={post.id} className="group relative flex flex-col h-full bg-black hover:bg-zinc-950/20 transition-all duration-700">
                            <div className="aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/5 group-hover:border-sor7ed-yellow/20 transition-all duration-700">
                                {post.cover ? (
                                    <img src={post.cover} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={post.title} />
                                ) : (
                                    <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-zinc-900 font-black text-3xl">SOR7ED</div>
                                )}
                            </div>

                            <div className="pt-10 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sor7ed-yellow">{post.branch || 'STRATEGY'}</span>
                                    <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                                    <span className="text-[10px] uppercase text-zinc-600 font-mono tracking-widest">{new Date(post.date).toLocaleDateString('en-GB')}</span>
                                </div>

                                <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight text-white group-hover:text-sor7ed-yellow transition-colors duration-500 mb-6">{post.title}</h3>
                                <p className="text-zinc-500 text-lg leading-relaxed line-clamp-3 italic mb-10 opacity-70 group-hover:opacity-100 transition-all">"{stripMarkdown(post.excerpt)}"</p>

                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 group-hover:text-zinc-400 transition-colors">
                                    <span>Read Full Entry</span>
                                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <footer className="text-center py-20 bg-black border-t border-white/5 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em]">
                    <p>SOR7ED &copy; {new Date().getFullYear()}</p>
                    <p className="hidden md:block">Neuro-Sovereign Architecture</p>
                </div>
            </footer>
        </div>
    );
}
