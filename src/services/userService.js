// This service handles user data operations
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'users.json');

// Read users from JSON file
export const getUsers = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data).users || [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Save users to JSON file
export const saveUsers = (users) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users }, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Add a new user
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  return saveUsers(users);
};

// Find user by email and password
export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
};

// Check if email exists
export const emailExists = (email) => {
  const users = getUsers();
  return users.some(user => user.email === email);
};