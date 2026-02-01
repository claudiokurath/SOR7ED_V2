import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center px-6">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 opacity-80"
                style={{ backgroundImage: `url('/assets/hero/hero-bg.png')` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

            {/* Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center pt-20">
                <div className="animate-fade-in-up">
                    <p className="hero-subtitle mb-6 flex items-center justify-center gap-2 uppercase">
                        ND Aware <span className="text-sor7ed-brand">•</span> Personal Concierge
                    </p>
                    <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] mb-8 tracking-wide">
                        WORRY LESS,<br />
                        <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">LIVE MORE.</span>
                    </h1>
                    <p className="section-description mb-12 max-w-2xl mx-auto">
                        Your overwhelm <span className="text-sor7ed-brand px-2 text-2xl">→</span> WhatsApp message <span className="text-sor7ed-brand px-2 text-2xl">→</span> It&apos;s handled.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="https://wa.me/447360277713?text=Hi,%20here%27s%20what%20I%27m%20stuck%20on%20right%20now:"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button"
                        >
                            Start on WhatsApp
                        </a>
                        <p className="small-text uppercase tracking-widest text-zinc-500">No forms. No signup. Just say 'Hi'.</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce z-20">
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-mono">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
            </div>
        </section>
    );
};

export default Hero;
