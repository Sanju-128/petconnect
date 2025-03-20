import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Auth } from './pages/Auth';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import PetRegistration from './pages/PetRegistration';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/register-pet" element={
        <ProtectedRoute>
          <PetRegistration />
        </ProtectedRoute>
      } />
      <Route path="/pets" element={<div className="p-8 bg-white rounded-lg shadow-md">Find a Pet page coming soon!</div>} />
      <Route path="/adopt" element={<div className="p-8 bg-white rounded-lg shadow-md">How to Adopt page coming soon!</div>} />
      <Route path="/stories" element={<div className="p-8 bg-white rounded-lg shadow-md">Success Stories page coming soon!</div>} />
      <Route path="/about" element={<div className="p-8 bg-white rounded-lg shadow-md">About Us page coming soon!</div>} />
      <Route path="/contact" element={<div className="p-8 bg-white rounded-lg shadow-md">Contact page coming soon!</div>} />
      <Route path="/volunteer" element={<div className="p-8 bg-white rounded-lg shadow-md">Volunteer page coming soon!</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;