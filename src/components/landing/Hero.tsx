import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Image - Full display */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url('${import.meta.env.BASE_URL}assets/hero/hero-bg.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

            {/* Content - Centered */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 relative z-10 text-center">
                <div className="max-w-4xl animate-fade-in-up">
                    <p className="hero-subtitle mb-8 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-widest font-bold">
                        The Lab For <span className="text-sor7ed-brand">Neurodivergent Minds</span>
                    </p>
                    <h1 className="font-display font-bold text-7xl md:text-[9rem] lg:text-[11rem] text-white mb-8 uppercase leading-[0.8] tracking-tight">
                        SOR7ED
                    </h1>
                    <p className="font-sans font-light text-zinc-300 text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed section-description mb-12">
                        Experiment. Build. Sort.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="#lab"
                            className="cta-button"
                        >
                            Explore Experiments
                        </a>
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
