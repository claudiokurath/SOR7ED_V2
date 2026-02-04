import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center">
                    {/* Logo */}
                    <Link href="/" className="mb-6">
                        <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="SOR7ED Logo" className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Tagline */}
                    <p className="text-zinc-400 max-w-sm mb-8 leading-relaxed">
                        The Lab for Neurodivergent Minds
                    </p>

                    {/* Copyright */}
                    <p className="text-zinc-600 text-sm font-mono uppercase tracking-widest">
                        SOR7ED LIMITED © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
