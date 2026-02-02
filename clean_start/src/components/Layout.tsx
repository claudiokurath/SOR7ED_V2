import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-sor7ed-brand selection:text-black">
            <Header />
            <main className="flex-grow pt-[280px]">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;
