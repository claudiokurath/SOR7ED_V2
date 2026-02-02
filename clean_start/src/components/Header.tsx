import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

const Header: React.FC = () => {
    const [location] = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 100) {
                // Always show at top
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Hide when scrolling down
                setIsVisible(false);
            } else {
                // Show when scrolling up
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    const scrollToPricing = () => {
        if (location !== '/') {
            window.location.href = '/#pricing';
        } else {
            const element = document.getElementById('pricing');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/5 transition-transform duration-300 gap-4 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <Link href="/" className="hover:opacity-80 transition-opacity">
                <img src="/assets/logo.png" alt="SOR7ED Logo" className="h-16 w-auto object-contain" />
            </Link>

            <nav className="nav-bar">
                <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
                    Landing
                </Link>
                <Link href="/lab" className={`nav-link ${location.startsWith('/lab') ? 'active' : ''}`}>
                    Lab
                </Link>
                <button onClick={scrollToPricing} className="nav-link bg-transparent border-0 cursor-pointer">
                    Pricing
                </button>
            </nav>

            <a
                href="https://wa.me/447360277713?text=Hi,%20here%27s%20what%20I%27m%20stuck%20on%20right%20now:"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
            >
                Message on WhatsApp
            </a>
        </header>
    );
};

export default Header;
