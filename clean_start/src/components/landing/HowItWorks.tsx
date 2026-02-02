import React, { useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepVideo = ({ step }: { step: any }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play().catch(e => console.log("Play prevented", e));
                setIsPlaying(true);
            }
        }
    };

    return (
        <div
            className="group relative flex flex-col items-center cursor-pointer"
            onClick={togglePlay}
        >
            <div className="step-number">{step.id}</div>

            <div className="step-image group-hover:border-sor7ed-brand/50 transition-colors duration-500 relative">
                <video
                    ref={videoRef}
                    src={step.video}
                    poster={step.poster}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    loop
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                />

                {/* Play Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-sor7ed-brand group-hover:text-black group-hover:border-sor7ed-brand transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-2xl ml-1">▶</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center text-center px-4">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.desc}</p>
            </div>
        </div>
    );
};

const HowItWorks: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "MESSAGE",
            desc: "WhatsApp us your chaos. Photos, voice notes, or messy text. No need to be tidy.",
            video: "/How It Works/stepone.mov",
            poster: "/How It Works/step1_poster.jpg"
        },
        {
            id: 2,
            title: "QUOTE",
            desc: "I clarify, plan, and give you a credit price. You confirm with a simple 'Yes'.",
            video: "/How It Works/steptwo.mov",
            poster: "/How It Works/step2_poster.jpg"
        },
        {
            id: 3,
            title: "SORTED",
            desc: "I handle it. You get a notification when it's done. Total peace of mind.",
            video: "/How It Works/stepthree.mov",
            poster: "/How It Works/step3_poster.jpg"
        }
    ];

    return (
        <section className="py-32 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4 border-b border-sor7ed-brand/30 inline-block pb-1">THE PROCESS</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight uppercase">HOW IT WORKS</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">From chaos to sorted. Messy input, clean output. <br />All on WhatsApp.</p>
                </div>

                <div className="how-it-works-grid mb-32">
                    {steps.map((step) => (
                        <div key={step.id} className="step-card group">
                            <StepVideo step={step} />
                        </div>
                    ))}
                </div>

                {/* Overwhelm Protocol */}
                <div className="relative rounded-[3rem] md:rounded-[4rem] border border-white/10 bg-zinc-900/20 p-12 md:p-24 text-center max-w-4xl mx-auto backdrop-blur-sm overflow-hidden group hover:border-sor7ed-brand/30 transition-colors duration-500">

                    <div className="relative z-10">
                        <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-6">OVERWHELM PROTOCOL</p>
                        <h3 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 uppercase">JUST TEXT 'PARK'.</h3>
                        <p className="text-xl md:text-3xl font-light text-zinc-400">I'll pause everything <br className="hidden md:block" />and return with one tiny next step.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
