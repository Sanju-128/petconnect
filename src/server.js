// This is a mock server file to simulate backend functionality
// In a real application, this would be a separate Node.js server

import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'users.json');

// Read the database file
async function readDatabase() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [] };
  }
}

// Write to the database file
async function writeDatabase(data) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
}

// API endpoints (these would be actual Express routes in a real app)

// Register a new user
export async function registerUser(userData) {
  try {
    const db = await readDatabase();
    
    // Check if email already exists
    if (db.users.some(user => user.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    // Add to database
    db.users.push(newUser);
    
    // Save database
    await writeDatabase(db);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

// Login a user
export async function loginUser(email, password) {
  try {
    const db = await readDatabase();
    
    // Find user
    const user = db.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Get all users (admin function)
export async function getAllUsers() {
  try {
    const db = await readDatabase();
    return { success: true, users: db.users };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, error: error.message };
  }
}