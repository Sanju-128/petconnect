import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Auth } from './pages/Auth';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/pets" element={<div className="p-8 bg-white rounded-lg shadow-md">Find a Pet page coming soon!</div>} />
            <Route path="/adopt" element={<div className="p-8 bg-white rounded-lg shadow-md">How to Adopt page coming soon!</div>} />
            <Route path="/stories" element={<div className="p-8 bg-white rounded-lg shadow-md">Success Stories page coming soon!</div>} />
            <Route path="/about" element={<div className="p-8 bg-white rounded-lg shadow-md">About Us page coming soon!</div>} />
            <Route path="/contact" element={<div className="p-8 bg-white rounded-lg shadow-md">Contact page coming soon!</div>} />
            <Route path="/volunteer" element={<div className="p-8 bg-white rounded-lg shadow-md">Volunteer page coming soon!</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;