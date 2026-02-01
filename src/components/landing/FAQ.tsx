import React, { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What exactly is a 'credit'?",
        answer: "A credit is a unit of task completion. One credit = one task handled from start to finish. A task is anything that takes roughly 15-45 minutes of focused effort. Examples: booking an appointment, researching 3 options for something, drafting an email, cancelling a subscription."
    },
    {
        question: "What if my task is bigger than one credit?",
        answer: "I'll let you know upfront. Bigger tasks (like organising your entire Drive or planning a trip) might need 2-3 credits. You'll always get a quote before I start, and you simply reply 'Yes' to confirm."
    },
    {
        question: "Do unused credits roll over?",
        answer: "Yes! Unused credits roll over for up to 2 months. Life gets busy—your credits understand that."
    },
    {
        question: "What can't you help with?",
        answer: "I can't provide mental health crisis support, legal or medical advice, access accounts requiring your password (I'll guide you through it instead), or anything illegal/unethical. I'm a concierge, not a therapist or lawyer."
    },
    {
        question: "How fast do you respond?",
        answer: "Usually within a few hours during UK business hours (9am-6pm GMT). For Essential and Pro members, you get priority responses. I'm not 24/7—but I'll never leave you hanging."
    },
    {
        question: "Is my information secure?",
        answer: "Absolutely. I use end-to-end encrypted WhatsApp, never store sensitive data, and delete conversation history after tasks are complete. Your privacy is non-negotiable."
    },
    {
        question: "What if I'm not happy with the result?",
        answer: "Tell me! I'll redo it or refund the credit—no questions asked. My goal is to genuinely reduce your overwhelm, not add to it."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, no lock-in contracts. Cancel via WhatsApp whenever you want. Any remaining credits stay valid for 30 days after cancellation."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-32 px-6 bg-black border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-sor7ed-brand font-mono text-[10px] uppercase tracking-widest mb-4">QUESTIONS</p>
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 uppercase">FAQ</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        The stuff you're probably wondering.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                                openIndex === index ? 'bg-white/5 border-sor7ed-brand/30' : 'hover:border-white/20'
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left bg-transparent border-0 cursor-pointer"
                            >
                                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                                <span className={`text-sor7ed-brand text-2xl transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-45' : ''
                                }`}>
                                    +
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="px-6 pb-6 text-zinc-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zinc-500 mb-4">Still have questions?</p>
                    <a
                        href="https://wa.me/447360277713?text=Hi,%20I%20have%20a%20question%20about%20SOR7ED:"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-block"
                    >
                        Ask on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
