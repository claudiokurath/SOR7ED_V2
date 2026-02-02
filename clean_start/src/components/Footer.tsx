import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-zinc-950/50 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-4">SOR7ED</h2>
                    <p className="text-zinc-500 max-w-xs font-light">
                        Worry Less, Live More. The anti-app solution for neurodivergent adults.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xs uppercase tracking-widest text-sor7ed-brand font-mono">Quick Links</h3>
                    <nav className="flex flex-col gap-2 text-sm text-zinc-400">
                        <Link href="/" className="hover:text-white transition-colors">Landing</Link>
                        <Link href="/landing" className="hover:text-white transition-colors">Landing (Ref)</Link>
                        <Link href="/lab" className="hover:text-white transition-colors">The Lab</Link>
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xs uppercase tracking-widest text-sor7ed-brand font-mono">Contact</h3>
                    <a href="mailto:claudio@planetsorted.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        claudio@planetsorted.com
                    </a>
                    <div className="text-xs text-zinc-600 mt-4 font-mono">
                        SOR7ED LIMITED © 2026
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
