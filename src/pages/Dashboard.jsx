import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, PawPrint, Heart, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { currentUser, logout, getUserPets } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    if (currentUser) {
      const result = getUserPets();
      if (result.success) {
        setUserPets(result.pets);
      }
    }
  }, [currentUser, getUserPets]);
  
  const handleLogout = () => {
    logout();
  };
  
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, {currentUser?.name}!</h2>
        <p className="text-gray-600">
          Thank you for being part of our community. Here you can manage your pets, view your favorites, and update your profile.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PawPrint className="text-orange-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Pets</h3>
          <p className="text-gray-600 mb-4">
            {userPets.length > 0 
              ? `You have ${userPets.length} pet${userPets.length > 1 ? 's' : ''} registered.`
              : 'You haven\'t registered any pets yet.'}
          </p>
          <Link 
            to="/register-pet" 
            className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            Register a Pet
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-orange-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Favorites</h3>
          <p className="text-gray-600 mb-4">
            You haven't saved any pets as favorites yet.
          </p>
          <Link 
            to="/pets" 
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Browse Pets
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="text-orange-500" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Account</h3>
          <p className="text-gray-600 mb-4">
            Update your profile information and preferences.
          </p>
          <button 
            onClick={() => setActiveTab('profile')}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            View Profile
          </button>
        </div>
      </div>
      
      {userPets.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Registered Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPets.map(pet => (
              <div key={pet.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                  <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
                  <p className="text-gray-700 mt-2">{pet.description}</p>
                  {pet.forSale && (
                    <p className="text-orange-500 font-medium mt-2">Listed for adoption</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  const renderProfile = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Profile</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <User className="text-orange-500" size={40} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{currentUser?.name}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{currentUser?.email}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{currentUser?.phone || 'Not provided'} </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">{currentUser?.address || 'Not provided'}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              {currentUser?.userType === 'adopter' ? 'Pet Adopter' : 
               currentUser?.userType === 'seller' ? 'Pet Lister' : 'Both'}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Unknown'}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={16} className="mr-1" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderPets = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Pets</h2>
        <Link
          to="/register-pet"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 inline-flex items-center"
        >
          <PlusCircle size={16} className="mr-1" />
          Register New Pet
        </Link>
      </div>
      
      {userPets.length === 0 ? (
        <div className="text-center py-8">
          <PawPrint className="mx-auto text-gray-300" size={48} />
          <p className="mt-4 text-gray-600">You haven't registered any pets yet.</p>
          <Link
            to="/register-pet"
            className="mt-4 inline-block text-orange-500 hover:text-orange-600 font-medium"
          >
            Register your first pet
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userPets.map(pet => (
            <div key={pet.id} className="border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
                <p className="text-gray-700 mt-2">{pet.description}</p>
                {pet.forSale && (
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                      Listed for adoption
                    </span>
                    {pet.price > 0 && (
                      <span className="ml-2 text-gray-700 font-medium">
                        ${pet.price}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'profile' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'pets' 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            Your Pets
          </button>
        </div>
      </div>
      
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'profile' && renderProfile()}
      {activeTab === 'pets' && renderPets()}
    </div>
  );
}

export default Dashboard;