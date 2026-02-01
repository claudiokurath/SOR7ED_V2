import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Branches from '../components/landing/Branches';
import FitCheck from '../components/landing/FitCheck';
import Testimonials from '../components/landing/Testimonials';
import CreditsExplainer from '../components/landing/CreditsExplainer';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';

const Landing: React.FC = () => {
    return (
        <Layout>
            <Hero />
            <HowItWorks />
            <Branches />
            <Testimonials />
            <FitCheck />
            <CreditsExplainer />
            <div id="pricing">
                <Pricing />
            </div>
            <FAQ />
        </Layout>
    );
};

export default Landing;
