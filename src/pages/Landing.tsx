import React from 'react';
import Layout from '../components/Layout';
import AboutUs from '../components/landing/AboutUs';
import BranchesMasonry from '../components/landing/BranchesMasonry';
import LabPreview from '../components/landing/LabPreview';

const Landing: React.FC = () => {
    return (
        <Layout>
            <div className="pt-24">
                <AboutUs />
                <BranchesMasonry />
                <div id="lab">
                    <LabPreview />
                </div>
            </div>
        </Layout>
    );
};

export default Landing;
