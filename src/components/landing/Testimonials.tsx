import React from 'react';

const testimonials = [
    {
        quote: "I've had a to-do list item to cancel my gym membership for 8 months. Messaged SOR7ED at 9am, done by lunch. I actually cried with relief.",
        name: "Sarah M.",
        role: "ADHD, Marketing Manager",
        highlight: "8 months → 3 hours"
    },
    {
        quote: "The 'PARK' command is life-changing. When I'm spiralling, I just text that one word and everything stops. Then I get one tiny next step I can actually do.",
        name: "James T.",
        role: "Autistic, Software Developer",
        highlight: "Overwhelm protocol"
    },
    {
        quote: "It's like having a friend who actually enjoys doing the boring admin stuff. No judgement, no 'why haven't you done this yet?' Just gets it done.",
        name: "Nina K.",
        role: "ADHD & Anxiety, Freelancer",
        highlight: "Zero judgement"
    },
    {
        quote: "Tried VAs before but explaining tasks took longer than doing them. With SOR7ED I just voice note my chaos and it comes back organised.",
        name: "David L.",
        role: "Dyslexic, Business Owner",
        highlight: "Voice note → sorted"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">REAL HUMANS</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 uppercase">What People Say</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-light max-w-xl mx-auto">
                        From overwhelmed to sorted. Their words, not mine.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:border-sor7ed-brand/20 transition-colors duration-300 flex flex-col"
                        >
                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 bg-sor7ed-brand/10 text-sor7ed-brand text-xs font-mono uppercase tracking-wider rounded-full">
                                    {t.highlight}
                                </span>
                            </div>
                            <blockquote className="text-white text-lg leading-relaxed mb-8 flex-grow">
                                "{t.quote}"
                            </blockquote>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sor7ed-brand to-amber-600 flex items-center justify-center text-black font-bold">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{t.name}</p>
                                    <p className="text-zinc-500 text-sm">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zinc-500 text-sm mb-6">
                        Join 50+ neurodivergent adults who've reclaimed their headspace
                    </p>
                    <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-6 h-6 text-sor7ed-brand" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-zinc-400">4.9/5 average rating</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
