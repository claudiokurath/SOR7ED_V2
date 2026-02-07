export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "£0",
            period: "Forever",
            description: "Essential tools for focus.",
            features: [
                "All blog articles",
                "WhatsApp templates",
                "Basic interactive tools",
                "Community access"
            ],
            cta: "Get Started",
            highlight: false,
            badge: "COMMUNITY"
        },
        {
            name: "Premium",
            price: "£9.99",
            period: "per month",
            description: "Advanced systems for productivity.",
            features: [
                "Everything in Free",
                "Save tool results",
                "Advanced calculators",
                "Priority support",
                "PDF reports & exports"
            ],
            cta: "Go Premium",
            highlight: true,
            badge: "MOST POPULAR"
        },
        {
            name: "Concierge",
            price: "£15-75",
            period: "per project",
            description: "Implementation help & task delegation.",
            features: [
                "1-on-1 task delegation",
                "Administrative support",
                "Custom system audits",
                "Implementation help",
                "Billed per task credit"
            ],
            cta: "Contact Sales",
            highlight: false,
            badge: "HIGH TOUCH"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="relative py-48 px-6 border-b border-white/5 bg-black">
                <div className="relative z-20 max-w-5xl mx-auto text-center">
                    <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-white mb-8 uppercase leading-[0.85]">
                        The <span className="text-sor7ed-yellow italic">Tiers.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-tight">
                        Honest pricing for honest tools. No dark patterns. Just practical support.
                    </p>
                </div>
            </header>

            <section className="py-32 px-6 max-w-[1500px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-10 rounded-[3rem] bg-zinc-950 border transition-all duration-700 flex flex-col h-full group relative overflow-hidden ${plan.highlight
                                ? 'border-sor7ed-yellow/50 shadow-[0_0_80px_rgba(245,198,20,0.05)]'
                                : 'border-white/5 hover:border-white/10'
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 w-40 h-40 bg-sor7ed-yellow/5 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                            )}

                            <div className="flex justify-between items-start mb-14 relative z-10">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full border ${plan.highlight ? 'bg-sor7ed-yellow text-black border-transparent' : 'bg-black text-zinc-500 border-white/10'
                                    }`}>
                                    {plan.badge}
                                </span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">{plan.name}</h3>
                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-6xl font-black text-white italic">{plan.price}</span>
                                    <span className="text-xs text-zinc-600 uppercase font-black tracking-[0.2em]">{plan.period}</span>
                                </div>
                                <p className="text-zinc-500 text-base mb-14 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{plan.description}"</p>

                                <div className="space-y-6 mb-16 flex-grow">
                                    {plan.features.map((feature, j) => (
                                        <div key={j} className="flex items-center gap-4 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                            <div className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? 'bg-sor7ed-yellow' : 'bg-zinc-800'}`}></div>
                                            <span className="font-medium tracking-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 relative z-10 transform active:scale-[0.98] ${plan.highlight
                                ? 'bg-white text-black hover:bg-sor7ed-yellow'
                                : 'bg-zinc-900/50 text-white hover:bg-white hover:text-black border border-white/5'
                                }`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-24 px-6 bg-transparent border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-sor7ed-yellow mb-6">Access Ethics</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">Free means free. Forever. We believe basic neurodivergent support should be a right, not a luxury.</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-sor7ed-yellow mb-6">Zero Friction</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">No predatory marketing. No complex cancellation loops. We respect your attention and your wallet.</p>
                        </div>
                    </div>
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
