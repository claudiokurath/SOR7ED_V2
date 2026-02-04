import React from 'react';

const AboutUs: React.FC = () => {
    const base = import.meta.env.BASE_URL;

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${base}assets/hero/hero-bg.png)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl text-white uppercase mb-6">
                            GET SORTED
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto">
                            We're here for the minds that work differently.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sor7ed-brand font-mono text-xs uppercase tracking-widest mb-6">ABOUT US</p>

                    <div className="space-y-8 text-zinc-300 text-xl md:text-2xl leading-relaxed">
                        <p>
                            SOR7ED is a resource for neurodivergent people navigating a world that wasn't built for them. Whether you're dealing with ADHD, autism, or just feel like your brain doesn't come with a standard manual — you're in the right place.
                        </p>

                        <p>
                            We talk about things others find uncomfortable. We offer practical strategies, not theory. Real talk, real tools, real results.
                        </p>

                        <p className="text-white text-2xl md:text-3xl font-medium">
                            Our mission: Help you get sorted — in your mind, your money, your body, your tech, your relationships, your style, and your growth.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
