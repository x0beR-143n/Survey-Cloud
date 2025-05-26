import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MainHeader from './components/home/MainHeader';
import Features from './components/home/Features';
import Templates from './components/home/Templates';
import Technologies from './components/home/Technologies';
import UserReview from './components/home/UserReview';
import MainFooter from './components/home/MainFooter';
import Footer from './components/layout/Footer';
import CreateForm from './pages/CreateForm';
import FormDetail from './pages/FormDetail';
import SubmitForm from './pages/SubmitForm';
import ViewFormResults from './pages/ViewFormResults';
import TemplatesPage from './pages/Templates';
import Review from './pages/Review';
import AllFeatures from './pages/AllFeatures';

const Home = () => (
  <>
    <MainHeader />
    <Features />
    <Templates />
    <Technologies />
    <UserReview />
    <MainFooter />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateForm />} />
            <Route path="/:formId" element={<FormDetail />} />
            <Route path="/submit-form" element={<SubmitForm />} />
            <Route path="/view-results" element={<ViewFormResults />} />
            <Route path="/view-results/:formId" element={<ViewFormResults />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/features" element={<AllFeatures />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
