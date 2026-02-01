import React from 'react';

const Pricing: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-black relative" id="pricing">
            {/* Background texture or glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">TRANSPARENT COSTS</p>
                    <h2 className="font-display font-bold text-6xl md:text-9xl text-white mb-8 uppercase">SIMPLE CREDITS.</h2>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Time tracking gives you anxiety. Credits give you clarity.<br className="hidden md:block" />
                        Known cost upfront. No surprise invoices.
                    </p>
                </div>

                <div className="pricing-grid">
                    {/* Starter */}
                    <div className="pricing-card">
                        <h3 className="pricing-tier-name">Starter</h3>
                        <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold text-sor7ed-brand align-top mr-1">£</span>
                            <span className="pricing-amount">15</span>
                        </div>
                        <p className="pricing-period">/ month</p>

                        <div className="pricing-credits">
                            1 Credit
                        </div>

                        <p className="small-text uppercase tracking-widest text-[#808080] mb-4 font-bold">Perfect for:</p>
                        <ul className="pricing-features">
                            <li>One small thing monthly</li>
                            <li>Monthly email draft</li>
                            <li>Subscription cleanup</li>
                        </ul>
                        <a href="https://buy.stripe.com/test_5kA02b7E82hK5lCdQR" className="choose-plan-btn w-full block text-center">Choose Plan</a>
                    </div>

                    {/* Essential (Featured) */}
                    <div className="pricing-card highlighted">
                        <div className="pricing-badge">Most Popular</div>
                        <h3 className="pricing-tier-name">Essential</h3>
                        <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold text-sor7ed-brand align-top mr-1">£</span>
                            <span className="pricing-amount">45</span>
                        </div>
                        <p className="pricing-period">/ month</p>

                        <div className="pricing-credits">
                            4 Credits
                        </div>

                        <p className="small-text uppercase tracking-widest text-[#808080] mb-4 font-bold">Perfect for:</p>
                        <ul className="pricing-features">
                            <li>Weekly tasks</li>
                            <li>Project phases</li>
                            <li>Regular support</li>
                            <li>48-hour guarantee</li>
                        </ul>
                        <a href="#" className="btn-primary w-full block text-center">Choose Plan</a>
                    </div>

                    {/* Pro */}
                    <div className="pricing-card">
                        <h3 className="pricing-tier-name">Pro</h3>
                        <div className="flex items-baseline mb-2">
                            <span className="text-2xl font-bold text-sor7ed-brand align-top mr-1">£</span>
                            <span className="pricing-amount">75</span>
                        </div>
                        <p className="pricing-period">/ month</p>

                        <div className="pricing-credits">
                            10 Credits
                        </div>

                        <p className="small-text uppercase tracking-widest text-[#808080] mb-4 font-bold">Everything plus:</p>
                        <ul className="pricing-features">
                            <li>Priority queue</li>
                            <li>Dedicated contact</li>
                            <li>15min monthly call</li>
                            <li>Quarterly audit</li>
                        </ul>
                        <a href="#" className="choose-plan-btn w-full block text-center">Choose Plan</a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Pricing;
