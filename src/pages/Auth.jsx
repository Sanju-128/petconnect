import React, { useState } from 'react';
import { Dog, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Auth() {
  const [authType, setAuthType] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (authType === 'signup') {
        // Check if email already exists
        if (users.some(user => user.email === formData.email)) {
          alert('Email already exists');
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
        };
        
        // Add to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // In a real app, this would be a server API call
        // For this demo, we'll simulate storing in the JSON file
        console.log('User registered:', newUser);
        
        alert('Account created successfully!');
        setAuthType('login');
      } else {
        // Login logic
        const user = users.find(u => 
          u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('Logged in successfully!');
          navigate('/'); // Redirect to home page
        } else {
          alert('Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-8 py-6">
            <div className="flex items-center justify-center mb-8">
              <Dog className="text-orange-500 mr-2" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">PetConnect</h1>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {authType === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {authType === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    required
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {authType === 'login' ? (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Account
                  </>
                )}
              </button>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              {authType === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
                className="font-medium text-orange-500 hover:text-orange-600"
              >
                {authType === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}