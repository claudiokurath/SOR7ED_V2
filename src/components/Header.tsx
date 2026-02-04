import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-center">
                    {/* Logo - Centered */}
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="SOR7ED Logo" className="h-10 w-auto object-contain" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
