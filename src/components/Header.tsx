import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Header: React.FC = () => {
    const [location] = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        if (location !== '/') {
            window.location.href = `/#${sectionId}`;
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
                        <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="SOR7ED Logo" className="h-10 w-auto object-contain" />
                        <span className="font-display font-bold text-xl text-white hidden sm:block">SOR7ED</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                            Home
                        </Link>
                        <button
                            onClick={() => scrollToSection('tools')}
                            className="nav-link bg-transparent border-0 cursor-pointer"
                        >
                            Tools
                        </button>
                        <Link href="/lab" className={`nav-link ${location.startsWith('/lab') ? 'active' : ''}`}>
                            Lab
                        </Link>
                    </nav>

                    {/* Desktop Menu Button (Mobile Trigger) */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden pt-4 pb-2 border-t border-white/10 mt-4">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className={`nav-link py-3 ${location === '/' ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <button
                                onClick={() => scrollToSection('tools')}
                                className="nav-link py-3 bg-transparent border-0 cursor-pointer text-left"
                            >
                                Tools
                            </button>
                            <Link
                                href="/lab"
                                className={`nav-link py-3 ${location.startsWith('/lab') ? 'active' : ''}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Lab
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
