import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Branches from '../components/landing/Branches';
import FitCheck from '../components/landing/FitCheck';

import Pricing from '../components/landing/Pricing';

const Landing: React.FC = () => {
    return (
        <Layout>
            <Hero />
            <HowItWorks />
            <Branches />
            <FitCheck />

            <div id="pricing">
                <Pricing />
            </div>
        </Layout>
    );
};

export default Landing;
