import React, { useState, useEffect } from 'react';
import { Dog, LogIn, UserPlus, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const [step, setStep] = useState(1);
  const [authType, setAuthType] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    userType: 'adopter', // 'adopter', 'seller', or 'both'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { login, register, currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (authType === 'signup') {
        if (!formData.name.trim()) newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      
      if (authType === 'signup' && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (currentStep === 2 && authType === 'signup') {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    
    try {
      if (authType === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setErrors({ auth: result.error || 'Login failed' });
        }
      } else {
        if (step < 3) {
          nextStep();
          setIsSubmitting(false);
          return;
        }
        
        // Final step for signup
        if (formData.password !== formData.confirmPassword) {
          setErrors({ confirmPassword: 'Passwords do not match' });
          setIsSubmitting(false);
          return;
        }
        
        const result = await register(formData);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setErrors({ auth: result.error || 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ auth: error.message || 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <>
      {authType === 'signup' && (
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>
      
      {authType === 'signup' && (
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`mt-1 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
      )}
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows="3"
          className={`mt-1 block w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I am interested in:
        </label>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="adopter"
              checked={formData.userType === 'adopter'}
              onChange={() => setFormData({ ...formData, userType: 'adopter' })}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Adopting pets</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="seller"
              checked={formData.userType === 'seller'}
              onChange={() => setFormData({ ...formData, userType: 'seller' })}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Listing pets for adoption</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="both"
              checked={formData.userType === 'both'}
              onChange={() => setFormData({ ...formData, userType: 'both' })}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Both adopting and listing pets</span>
          </label>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Account Summary:</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {formData.name}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {formData.email}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {formData.phone}</p>
          <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {formData.address}</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Account Type:</span> {
              formData.userType === 'adopter' ? 'Pet Adopter' : 
              formData.userType === 'seller' ? 'Pet Lister' : 'Both'
            }
          </p>
        </div>
      </div>
    </>
  );

  const renderStepContent = () => {
    if (authType === 'login') {
      return renderStep1();
    }
    
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const renderStepIndicator = () => {
    if (authType === 'login') return null;
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-xs mt-1 text-gray-600">
                {stepNumber === 1 ? 'Account' : stepNumber === 2 ? 'Details' : 'Preferences'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative flex items-center mt-2">
          <div className="absolute left-4 right-4 h-1 bg-gray-200">
            <div 
              className="h-1 bg-orange-500 transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
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
            <div className="flex items-center justify-center mb-6">
              <Dog className="text-orange-500 mr-2" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">PetConnect</h1>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              {authType === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            
            {renderStepIndicator()}
            
            {errors.auth && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.auth}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStepContent()}
              
              <div className={`flex ${authType === 'signup' && step > 1 ? 'justify-between' : 'justify-center'} mt-6`}>
                {authType === 'signup' && step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center gap-1 text-gray-600 hover:text-orange-500"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : authType === 'login' ? (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  ) : step < 3 ? (
                    <>
                      Next
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              {authType === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setAuthType(authType === 'login' ? 'signup' : 'login');
                  setStep(1);
                  setErrors({});
                }}
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