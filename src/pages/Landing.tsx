import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/landing/Hero';
import ToolsSection from '../components/landing/ToolsSection';
import LabPreview from '../components/landing/LabPreview';
import Branches from '../components/landing/Branches';

const Landing: React.FC = () => {
    return (
        <Layout>
            <Hero />
            <ToolsSection />
            <div id="branches">
                <Branches />
            </div>
            <div id="lab">
                <LabPreview />
            </div>
        </Layout>
    );
};

export default Landing;
