import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MainHeader from '../components/home/MainHeader';
import Features from '../components/home/Features';
import TemplatesSection from '../components/home/Templates';
import Technologies from '../components/home/Technologies';
import UserReview from '../components/home/UserReview';
import MainFooter from '../components/home/MainFooter';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <MainHeader />
        <Features />
        <TemplatesSection />
        <Technologies />
        <UserReview />
        <MainFooter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;