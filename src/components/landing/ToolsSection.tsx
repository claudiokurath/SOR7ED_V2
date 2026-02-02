import React from 'react';

const tools = [
    {
        id: 'dopamine',
        title: 'Dopamine Menu Generator',
        desc: 'Create your personalized menu of healthy dopamine sources to refill your tank.',
        status: 'Coming Soon',
        branch: 'MIND'
    },
    {
        id: 'body-doubling',
        title: 'Body Doubling Room',
        desc: '24/7 Virtual Co-working space. Just show up, state your task, and work.',
        status: 'Coming Soon',
        branch: 'FOCUS'
    },
    {
        id: 'matrix',
        title: 'Eisenhower Matrix Bot',
        desc: 'Automated task prioritization. Dump your tasks, get a sorted list.',
        status: 'Alpha',
        branch: 'TECH'
    }
];

const ToolsSection: React.FC = () => {
    return (
        <section id="tools" className="py-32 px-6 bg-zinc-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">The Toolkit</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6">Tools</h2>
                    <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        Digital prosthetics for your executive function.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <div key={tool.id} className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-sor7ed-brand/50 transition-all duration-300">
                            <div className="absolute top-6 right-6">
                                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${tool.status === 'Live' ? 'border-green-500 text-green-500' : 'border-zinc-700 text-zinc-500'}`}>
                                    {tool.status}
                                </span>
                            </div>
                            <div className="text-sor7ed-brand font-mono text-xs uppercase tracking-widest mb-4">{tool.branch}</div>
                            <h3 className="font-display text-2xl text-white mb-4 group-hover:text-sor7ed-brand transition-colors">{tool.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-8">{tool.desc}</p>

                            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                                <span>Learn More</span>
                                <span>→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
