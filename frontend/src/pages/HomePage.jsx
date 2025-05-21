import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/MainHeader';
import FeaturesSection from '../components/home/Features';
import TemplatesSection from '../components/home/Templates';
import TechnologiesSection from '../components/home/Technologies';
import TestimonialsSection from '../components/home/UserReview';
import CTASection from '../components/home/MainFooter';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TemplatesSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;