import { Link } from 'react-router-dom'
import contentData from '../data/content.json'

interface Tool {
    id: string;
    name: string;
    description: string;
    link: string;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    cover?: string;
}

const { tools, blog } = contentData as { tools: Tool[], blog: BlogPost[] };

const stripMarkdown = (text: string) => {
    return text
        .replace(/[#*`_~]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();
};

export default function Home() {
    const validTools = tools.filter(t => t.name !== 'Untitled' && t.description !== 'No description available.');
    const validBlog = blog.filter(b => b.title && b.excerpt && b.excerpt.length > 10);

    const featuredTools = validTools.slice(0, 4);
    const featuredPosts = validBlog.slice(0, 3);

    const branches = [
        { name: "Mind", image: "/images/branches/mind.png", colSpan: "md:col-span-2 md:row-span-2", description: "Mental load, routines & clarity." },
        { name: "Wealth", image: "/images/branches/wealth.png", colSpan: "md:col-span-1", description: "Financial systems." },
        { name: "Body", image: "/images/branches/body.png", colSpan: "md:col-span-1", description: "Health & vitality." },
        { name: "Tech", image: "/images/branches/tech.png", colSpan: "md:col-span-1", description: "Digital leverage." },
        { name: "Connect", image: "/images/branches/connection.png", colSpan: "md:col-span-1", description: "Real relationships." },
        { name: "Brand", image: "/images/branches/impression.png", colSpan: "md:col-span-1", description: "Self presentation." },
        { name: "Growth", image: "/images/branches/growtfh.png", colSpan: "md:col-span-1", description: "Skill evolution." }
    ];

    return (
        <div className="min-h-screen bg-black font-sans text-white">
            <header className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 bg-black overflow-hidden border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sor7ed-yellow/5 blur-[120px] rounded-full"></div>

                <div className="relative z-30 max-w-7xl flex flex-col items-center">
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-[0.8] uppercase mb-12">
                        <span className="block italic opacity-40">Worry Less.</span>
                        <span className="text-sor7ed-yellow">Live More.</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-zinc-500 max-w-2xl mx-auto font-medium leading-tight mb-20 tracking-tight">
                        Practical blueprints and hard-won insights for the <span className="text-white">neurodivergent mind</span>. No apps. No metrics. No noise.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 items-center">
                        <a href="https://wa.me/447360277713?text=START" target="_blank" className="px-14 py-7 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-sor7ed-yellow hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                            Launch in WhatsApp
                        </a>
                        <Link to="/tools" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-all border-b border-white/5 pb-1">
                            Explore library
                        </Link>
                    </div>
                </div>
            </header>

            <section className="py-40 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center border-y border-white/10 py-24">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">System Over Luck.</h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-12">
                        Productivity is a battle with your biology. We build blueprints to help you win it without the burnout. Quick, practical, and actually helpful.
                    </p>
                    <div className="flex justify-center">
                        <div className="text-6xl font-black text-white/10 italic">SOR7ED</div>
                    </div>
                </div>
            </section>

            <section id="branches" className="py-32 px-6 bg-black border-t border-white/5 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-24">
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">The 7 Branches.</h2>
                        <p className="text-zinc-500 max-w-sm text-sm uppercase tracking-widest">Everything in life, categorized for the ND brain.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:h-[900px]">
                        {branches.map((b, i) => (
                            <div key={b.name} className={`relative group rounded-3xl overflow-hidden bg-zinc-950 border border-white/5 hover:border-sor7ed-yellow/40 transition-all duration-700 ${b.colSpan}`}>
                                <img src={b.image} alt={b.name} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0 duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                                    <span className="font-mono text-xs text-sor7ed-yellow/50 group-hover:text-sor7ed-yellow tracking-widest transition-colors tracking-[0.3em]">0{i + 1}</span>
                                    <div>
                                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">{b.name}</h3>
                                        <p className="text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-500 font-medium">
                                            {b.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="lab" className="py-40 px-6 bg-black border-t border-white/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-24 px-4 gap-12">
                        <div>
                            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none">The Lab.</h2>
                            <p className="text-zinc-500 mt-6 max-w-md text-lg uppercase tracking-widest">Hard-won insights on neurodiversity.</p>
                        </div>
                        <Link to="/blog" className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-bold uppercase text-xs tracking-widest">
                            Read Archive →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {featuredPosts.map((post) => (
                            <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-zinc-950 rounded-[2.5rem] p-6 border border-white/5 hover:border-sor7ed-yellow/30 transition-all duration-500">
                                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-8">
                                    <img src={post.cover} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={post.title} />
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <h3 className="text-3xl font-black uppercase leading-tight text-white mb-4 group-hover:text-sor7ed-yellow transition-colors">{post.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-3">"{stripMarkdown(post.excerpt)}"</p>
                                    <div className="mt-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-700">
                                        <span>Access Insight</span>
                                        <span className="group-hover:translate-x-1 transition-transform group-hover:text-white">→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="tools" className="py-40 px-6 bg-black border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">The Tools.</h2>
                        <p className="text-zinc-500 text-lg uppercase tracking-widest">Direct deployments for ADHD clarity.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {featuredTools.map((tool) => (
                            <div key={tool.id} className="bg-zinc-950 p-8 rounded-3xl border border-white/5 hover:border-sor7ed-yellow/30 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-sor7ed-yellow mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">{tool.name}</h3>
                                <p className="text-zinc-500 text-xs leading-relaxed mb-10 min-h-[60px]">{tool.description}</p>

                                <a
                                    href={`https://wa.me/447360277713?text=${tool.name.split(' ')[0].toUpperCase()}`}
                                    target="_blank"
                                    className="w-full py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sor7ed-yellow transition-all block text-center"
                                >
                                    Use in WhatsApp
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/tools" className="text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-all border-b border-zinc-800 pb-1">
                            Explore full library
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="py-24 border-t border-white/5 bg-black text-center px-6">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em]">
                    <p>SOR7ED &copy; {new Date().getFullYear()}</p>
                    <div className="flex gap-12 font-bold">
                        <a href="#" className="hover:text-sor7ed-yellow transition-colors">Instagram</a>
                        <a href="#" className="hover:text-sor7ed-yellow transition-colors">TikTok</a>
                    </div>
                    <p>Neuro-Sovereign Architecture</p>
                </div>
            </footer>
        </div>
    );
}
