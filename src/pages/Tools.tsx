import contentData from '../data/content.json';

interface Tool {
    id: string;
    name: string;
    description: string;
    link: string;
}

const { tools } = contentData as { tools: Tool[] };

export default function Tools() {
    const validTools = tools.filter(t => t.name !== 'Untitled' && t.description !== 'No description available.');

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="relative py-48 px-6 border-b border-white/5 bg-black">
                <div className="relative z-20 max-w-5xl mx-auto text-center">
                    <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-8 uppercase leading-[0.85]">
                        The <span className="text-sor7ed-yellow italic">Tools.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-tight">
                        Practical blueprints for life admin and executive function. Delivered simple, fast, and where you need them.
                    </p>
                </div>
            </header>

            <section className="py-32 px-6 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {validTools.map((tool) => (
                        <div key={tool.id} className="bg-zinc-950 p-10 flex flex-col justify-between min-h-[460px] rounded-[3rem] border border-white/5 hover:border-sor7ed-yellow/30 transition-all duration-700 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sor7ed-yellow/5 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-sor7ed-yellow/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-sor7ed-yellow shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <div className="h-px w-8 bg-zinc-900 mt-7"></div>
                                </div>

                                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-sor7ed-yellow transition-colors duration-500">{tool.name}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">{tool.description}</p>

                                {tool.link && (
                                    <div className="mb-8 p-5 bg-black/60 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
                                        <span className="text-[10px] uppercase text-zinc-600 block mb-3 font-black tracking-[0.2em] leading-none">Resource Asset</span>
                                        <a href={tool.link} target="_blank" className="text-xs text-sor7ed-yellow font-bold truncate block hover:underline tracking-tight">
                                            {tool.link.replace('https://', '').split('/')[0]} →
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto relative z-10">
                                <a
                                    href={`https://wa.me/447360277713?text=${tool.name.split(' ')[0].toUpperCase()}`}
                                    target="_blank"
                                    className="block w-full py-5 bg-white text-black text-center text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-sor7ed-yellow transition-all duration-300 transform active:scale-[0.98]"
                                >
                                    Use Template
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-20 bg-black border-t border-white/5 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em]">
                    <p>SOR7ED &copy; {new Date().getFullYear()}</p>
                    <p className="hidden md:block">System Over Luck</p>
                </div>
            </footer>
        </div>
    );
}
