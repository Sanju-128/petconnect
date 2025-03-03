// This file handles API requests for user authentication
// For this demo, we're using localStorage for persistence

/**
 * Register a new user
 * @param {Object} userData - User data including name, email, and password
 * @returns {Promise<Object>} Result of the registration
 */
export const registerUser = async (userData) => {
  try {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    // Create new user with ID and timestamp
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update the JSON file (simulated)
    updateJsonDatabase(users);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message || 'Registration failed' };
  }
};

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Result of the login attempt
 */
export const loginUser = async (email, password) => {
  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'Login failed' };
  }
};

/**
 * Logout the current user
 * @returns {Object} Result of the logout
 */
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  return { success: true };
};

/**
 * Get the current logged-in user
 * @returns {Object|null} Current user or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Simulate updating the JSON database file
 * In a real app, this would be an API call to the server
 * @param {Array} users - Array of user objects
 */
const updateJsonDatabase = (users) => {
  // This is a simulation - in a real app, this would be an API call
  console.log('Updating JSON database with users:', users);
  
  // In a browser environment, we can't directly write to files
  // This would normally be handled by a server-side API
  
  // For demonstration purposes, we'll log the data that would be saved
  const dbData = { users };
  console.log('Database updated with:', JSON.stringify(dbData, null, 2));
};