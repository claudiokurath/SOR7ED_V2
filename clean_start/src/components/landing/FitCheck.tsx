import React from 'react';

const FitCheck: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto comparison-section">

                <div className="text-center mb-16">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">The Fit</p>
                    <h2 className="comparison-title text-6xl md:text-8xl">Is SOR7ED for you?</h2>
                    <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-3xl mx-auto">
                        Built deeply for neurodivergent adults and overwhelmed professionals who are tired of managing their manage.
                    </p>
                </div>

                <div className="comparison-grid">
                    {/* Card 1: Yes */}
                    <div className="comparison-card positive">
                        <h3 className="font-display text-3xl text-sor7ed-brand mb-8 text-center">You're in the right place if:</h3>
                        <ul className="comparison-list">
                            {[
                                "You regularly miss small but important tasks",
                                "You feel guilty about admin you haven't done",
                                "You have 50 tabs open in your brain",
                                "Forms make you want to cry"
                            ].map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Card 2: No */}
                    <div className="comparison-card negative text-opacity-50">
                        <h3 className="font-display text-3xl text-white/40 mb-8 text-center">SOR7ED is NOT a fit if:</h3>
                        <ul className="comparison-list">
                            {[
                                "You need crisis mental health support",
                                "You want a VA for 40 hours a week",
                                "You expect instant replies at 3am"
                            ].map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
};
export default FitCheck;
