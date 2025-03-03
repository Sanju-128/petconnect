// Utility functions for authentication

// Save user data to localStorage
export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user to storage:', error);
    return false;
  }
};

// Get current user from localStorage
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

// Logout user (remove from localStorage)
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// Get all users from localStorage
export const getAllUsers = () => {
  try {
    const usersJson = localStorage.getItem('users');
    if (!usersJson) return [];
    return JSON.parse(usersJson);
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Add user to localStorage
export const addUserToStorage = (user) => {
  try {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error adding user to storage:', error);
    return false;
  }
};

// Check if email exists in localStorage
export const emailExistsInStorage = (email) => {
  const users = getAllUsers();
  return users.some(user => user.email === email);
};