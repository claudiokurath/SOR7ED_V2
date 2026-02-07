import { Link } from 'react-router-dom'
import { useState } from 'react'
import contentData from '../data/content.json'
import LeadFormModal from '../components/LeadFormModal'

interface Tool {
    id: string;
    name: string;
    description: string;
    link: string;
    status: string;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    cover?: string;
    status: string;
}

const { tools, blog } = contentData as { tools: Tool[], blog: BlogPost[] };

const stripMarkdown = (text: string) => {
    return text
        .replace(/[#*`_~]/g, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();
};

export default function Home() {
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ type: 'whatsapp' | 'tool', value: string } | null>(null);

    const validTools = tools.filter(t => t.status === 'Published');
    const validBlog = blog.filter(b => b.status === 'Published');

    const featuredTools = validTools.slice(0, 4);
    const featuredPosts = validBlog.slice(0, 3);

    const handleActionClick = (type: 'whatsapp' | 'tool', value: string) => {
        setPendingAction({ type, value });
        setIsLeadModalOpen(true);
    };

    const handleLeadSuccess = () => {
        setIsLeadModalOpen(false);
        if (pendingAction) {
            if (pendingAction.type === 'whatsapp') {
                window.open('https://wa.me/447360277713?text=START', '_blank');
            } else if (pendingAction.type === 'tool') {
                window.open(`https://wa.me/447360277713?text=${pendingAction.value.split(' ')[0].toUpperCase()}`, '_blank');
            }
        }
        setPendingAction(null);
    };

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
        <div className="min-h-screen bg-black text-white">
            <LeadFormModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                onSuccess={handleLeadSuccess}
                title={pendingAction?.type === 'tool' ? pendingAction.value : "Sovereign Hub"}
            />
            <header className="relative min-h-[95vh] flex items-center justify-end px-12 md:px-24 bg-black overflow-hidden border-b border-white/5">
                <img
                    src="/Hero.png"
                    alt="SOR7ED Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-10 max-w-4xl text-right">
                    <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.75] uppercase mb-16 text-white">
                        <span className="block italic opacity-20">Worry Less.</span>
                        <span className="">Live More.</span>
                    </h1>

                    <div className="flex justify-end gap-10 items-center">
                        <button
                            onClick={() => handleActionClick('whatsapp', 'START')}
                            className="px-14 py-7 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-sor7ed-yellow transition-all shadow-2xl"
                        >
                            Launch in WhatsApp
                        </button>
                        <Link to="/tools" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all border-b border-white/10 pb-1">
                            Explore library
                        </Link>
                    </div>
                </div>
            </header>

            <section id="ethos" className="py-56 px-6 bg-black border-b border-white/5">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="text-sor7ed-yellow text-[10px] font-black uppercase tracking-[0.5em] mb-12 block">Philosophy</span>
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-20 leading-none">
                        Neuro-Sovereign Architecture.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-left">
                        <p className="text-2xl text-zinc-400 font-medium leading-relaxed">
                            Practical blueprints and hard-won insights for the <span className="text-white italic">neurodivergent mind</span>. No apps. No metrics. No noise. Just systems that work with your biology, not against it.
                        </p>
                        <p className="text-2xl text-zinc-400 font-medium leading-relaxed">
                            Productivity is a battle with your unique brain chemistry. We build the tactical blueprints to help you win it without the burnout. Quick, practical, and direct to where you need them.
                        </p>
                    </div>
                </div>
            </section>

            <section id="branches" className="py-32 px-6 bg-black border-t border-white/5 relative">
                <div className="max-w-[1400px] mx-auto text-center mb-32">
                    <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white mb-8 italic opacity-10">Foundations</h2>
                    <div className="flex flex-col items-center">
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">The 7 Branches.</h3>
                        <p className="text-zinc-500 max-w-sm text-sm uppercase tracking-[0.3em] font-medium">Categorized for clarity.</p>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto">
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
                            <p className="text-zinc-500 mt-6 max-w-md text-sm uppercase tracking-[0.4em] font-medium">Hard-won insights on neurodiversity.</p>
                        </div>
                        <Link to="/blog" className="px-10 py-4 rounded-2xl border border-white/10 hover:bg-white hover:text-black transition-all font-bold uppercase text-[10px] tracking-widest">
                            Read Archive →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {featuredPosts.map((post) => (
                            <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-zinc-950 rounded-[2.5rem] p-6 border border-white/5 hover:border-sor7ed-yellow/30 transition-all duration-500">
                                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-8 bg-black">
                                    {post.cover ? (
                                        <img src={post.cover} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={post.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-900 font-black text-2xl">SOR7ED</div>
                                    )}
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <h3 className="text-3xl font-black uppercase leading-[1.1] text-white mb-4 group-hover:text-sor7ed-yellow transition-colors">{post.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">"{stripMarkdown(post.excerpt)}"</p>
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

                                <button
                                    onClick={() => handleActionClick('tool', tool.name)}
                                    className="w-full py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sor7ed-yellow transition-all block text-center"
                                >
                                    Use in WhatsApp
                                </button>
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
