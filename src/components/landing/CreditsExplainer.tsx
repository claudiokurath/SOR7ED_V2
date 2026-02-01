import React from 'react';

const examples = [
    {
        credits: 1,
        tasks: [
            "Book a dentist appointment",
            "Cancel unused subscriptions",
            "Draft a tricky email",
            "Research 3 options for something",
            "Create a meal plan for the week"
        ]
    },
    {
        credits: 2,
        tasks: [
            "Organise your Google Drive folders",
            "Plan a weekend trip (flights + hotel)",
            "Set up a budgeting spreadsheet",
            "Review and optimise your insurance"
        ]
    },
    {
        credits: 3,
        tasks: [
            "Full digital declutter (inbox + files)",
            "Create a personalised routine system",
            "Research and compare major purchases",
            "Build a 90-day goal roadmap"
        ]
    }
];

const CreditsExplainer: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-zinc-950/50 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">CREDIT SYSTEM</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 uppercase">How Credits Work</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        No hourly rates. No surprise invoices. <br className="hidden md:block" />
                        Just clear, upfront pricing for every task.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {examples.map((example, idx) => (
                        <div key={idx} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 hover:border-sor7ed-brand/30 transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-sor7ed-brand/20 flex items-center justify-center">
                                    <span className="text-sor7ed-brand font-bold text-xl">{example.credits}</span>
                                </div>
                                <span className="text-white font-medium">
                                    {example.credits === 1 ? 'Credit' : 'Credits'}
                                </span>
                            </div>
                            <ul className="space-y-3">
                                {example.tasks.map((task, taskIdx) => (
                                    <li key={taskIdx} className="flex items-start gap-3">
                                        <span className="text-sor7ed-brand mt-1">-</span>
                                        <span className="text-zinc-300 text-sm leading-relaxed">{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-sor7ed-brand/10 to-transparent border border-sor7ed-brand/20 rounded-3xl p-8 md:p-12 text-center">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Not sure how many credits you need?</h3>
                    <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                        Message me with what's on your plate. I'll tell you exactly how many credits it'll take—no commitment required.
                    </p>
                    <a
                        href="https://wa.me/447360277713?text=Hi,%20I%27m%20trying%20to%20figure%20out%20how%20many%20credits%20I%20need.%20Here%27s%20what%20I%27m%20dealing%20with:"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button inline-block"
                    >
                        Get a Free Quote
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CreditsExplainer;
