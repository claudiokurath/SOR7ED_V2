import React, { useState } from 'react';

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (details: { name: string; email: string; phone: string }) => void;
    title: string;
}

export default function LeadFormModal({ isOpen, onClose, onSuccess, title }: LeadFormModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API call to CRM/Netlify Function
        try {
            const leadData = {
                name,
                email,
                phone,
                requested: title,
                timestamp: new Date().toISOString()
            };

            // In a real scenario with a Netlify function:
            // await fetch('/.netlify/functions/lead-capture', { 
            //     method: 'POST', 
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(leadData) 
            // });

            // For now, let's log it to simulate the CRM addition
            console.log('Lead Captured for CRM:', leadData);

            onSuccess({ name, email, phone });
        } catch (error) {
            console.error('Lead capture failed', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
            <div className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sor7ed-yellow/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="relative z-10">
                    <span className="text-sor7ed-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Access Blueprint</span>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 leading-none">Get {title}.</h2>
                    <p className="text-zinc-500 text-[10px] mb-12 uppercase tracking-[0.2em] leading-relaxed">Enter your details to generate your direct deployment link.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-3 ml-2">Full Name</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="YOUR NAME"
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-sor7ed-yellow/50 transition-all text-xs uppercase font-bold tracking-widest"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-3 ml-2">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EMAIL@DOMAIN.COM"
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-sor7ed-yellow/50 transition-all text-xs uppercase font-bold tracking-widest"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-3 ml-2">Phone Number</label>
                            <input
                                required
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+44 0000 000000"
                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-sor7ed-yellow/50 transition-all text-xs uppercase font-bold tracking-widest"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-6 mt-8 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all transform active:scale-95 ${loading ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-sor7ed-yellow shadow-2xl'}`}
                        >
                            {loading ? 'Processing...' : 'Get Access →'}
                        </button>
                    </form>

                    <p className="mt-8 text-[9px] text-center text-zinc-700 uppercase tracking-widest italic leading-relaxed">
                        By requesting access, you agree to join the SOR7ED inner circle. High signal, zero noise.
                    </p>
                </div>
            </div>
        </div>
    );
}
