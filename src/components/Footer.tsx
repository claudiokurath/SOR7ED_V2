import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="py-16 px-6 border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <h2 className="text-3xl font-display font-bold text-white">SOR7ED</h2>
                        </Link>
                        <p className="text-zinc-400 max-w-sm mb-6 leading-relaxed">
                            Your WhatsApp-first personal concierge. Built for neurodivergent adults who are tired of managing their manage.
                        </p>
                        <a
                            href="https://wa.me/447360277713?text=Hi,%20I%27d%20like%20to%20learn%20more%20about%20SOR7ED"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sor7ed-brand hover:text-sor7ed-brand-soft transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Message on WhatsApp
                        </a>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-sor7ed-brand font-mono mb-4">Navigate</h3>
                        <nav className="flex flex-col gap-3">
                            <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                Home
                            </Link>
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className="text-zinc-400 hover:text-white transition-colors text-sm text-left bg-transparent border-0 cursor-pointer p-0"
                            >
                                How It Works
                            </button>
                            <button
                                onClick={() => scrollToSection('branches')}
                                className="text-zinc-400 hover:text-white transition-colors text-sm text-left bg-transparent border-0 cursor-pointer p-0"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className="text-zinc-400 hover:text-white transition-colors text-sm text-left bg-transparent border-0 cursor-pointer p-0"
                            >
                                Pricing
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className="text-zinc-400 hover:text-white transition-colors text-sm text-left bg-transparent border-0 cursor-pointer p-0"
                            >
                                FAQ
                            </button>
                            <Link href="/lab" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                The Lab
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-sor7ed-brand font-mono mb-4">Contact</h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:claudio@planetsorted.com"
                                className="text-zinc-400 hover:text-white transition-colors text-sm"
                            >
                                claudio@planetsorted.com
                            </a>
                            <a
                                href="https://wa.me/447360277713"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors text-sm"
                            >
                                +44 7360 277713
                            </a>
                        </div>

                        <h3 className="text-xs uppercase tracking-widest text-sor7ed-brand font-mono mb-4 mt-8">Legal</h3>
                        <div className="flex flex-col gap-3">
                            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors text-sm">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-sm font-mono">
                        SOR7ED LIMITED © {new Date().getFullYear()}
                    </p>
                    <p className="text-zinc-600 text-sm">
                        Made with care for overwhelmed brains
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
