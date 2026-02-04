import React from 'react';

const branches = [
    { name: 'MIND', image: 'mind.png', description: 'Mental clarity, focus, and emotional intelligence' },
    { name: 'WEALTH', image: 'wealth.png', description: 'Financial freedom and smart money management' },
    { name: 'BODY', image: 'body.png', description: 'Physical health, fitness, and energy optimization' },
    { name: 'TECH', image: 'tech.png', description: 'Leveraging technology to enhance your life' },
    { name: 'CONNECTION', image: 'connection.png', description: 'Building meaningful relationships' },
    { name: 'IMPRESSION', image: 'impression.png', description: 'Personal style, presentation, and how you show up in the world' },
    { name: 'GROWTH', image: 'growtfh.png', description: 'Continuous learning and self-improvement' },
];

const BranchesMasonry: React.FC = () => {
    const base = import.meta.env.BASE_URL;

    return (
        <section className="py-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">THE 7 BRANCHES</p>
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-white uppercase">AREAS OF FOCUS</h2>
                </div>

                {/* 2-row Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {/* Row 1: 4 images */}
                    {branches.slice(0, 4).map((branch) => (
                        <div
                            key={branch.name}
                            className="relative group overflow-hidden rounded-xl aspect-[3/4]"
                        >
                            <img
                                src={`${base}7 Branches/${branch.image}`}
                                alt={branch.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                <h3 className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-wider mb-1">
                                    {branch.name}
                                </h3>
                                <p className="text-white/70 text-xs md:text-sm leading-tight">
                                    {branch.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Row 2: CONNECTION, IMPRESSION (double), GROWTH */}
                    <div
                        className="relative group overflow-hidden rounded-xl aspect-[3/4]"
                    >
                        <img
                            src={`${base}7 Branches/${branches[4].image}`}
                            alt={branches[4].name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <h3 className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-wider mb-1">
                                {branches[4].name}
                            </h3>
                            <p className="text-white/70 text-xs md:text-sm leading-tight">
                                {branches[4].description}
                            </p>
                        </div>
                    </div>

                    {/* IMPRESSION - Double width */}
                    <div
                        className="relative group overflow-hidden rounded-xl aspect-[3/4] md:aspect-[3/2] col-span-1 md:col-span-2"
                    >
                        <img
                            src={`${base}7 Branches/${branches[5].image}`}
                            alt={branches[5].name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <h3 className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-wider mb-1">
                                {branches[5].name}
                            </h3>
                            <p className="text-white/70 text-xs md:text-sm leading-tight">
                                {branches[5].description}
                            </p>
                        </div>
                    </div>

                    {/* GROWTH */}
                    <div
                        className="relative group overflow-hidden rounded-xl aspect-[3/4]"
                    >
                        <img
                            src={`${base}7 Branches/${branches[6].image}`}
                            alt={branches[6].name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                            <h3 className="font-display font-bold text-lg md:text-xl text-white uppercase tracking-wider mb-1">
                                {branches[6].name}
                            </h3>
                            <p className="text-white/70 text-xs md:text-sm leading-tight">
                                {branches[6].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BranchesMasonry;
