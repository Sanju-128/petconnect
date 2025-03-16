import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');
const PETS_PATH = path.join(__dirname, '..', 'data', 'pets.json');

// Ensure data directory exists
async function initializeDatabase() {
  const dataDir = path.join(__dirname, '..', 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
    
    // Initialize users.json if it doesn't exist
    try {
      await fs.access(USERS_PATH);
    } catch {
      await fs.writeFile(USERS_PATH, JSON.stringify({ users: [] }, null, 2));
    }
    
    // Initialize pets.json if it doesn't exist
    try {
      await fs.access(PETS_PATH);
    } catch {
      await fs.writeFile(PETS_PATH, JSON.stringify({ pets: [] }, null, 2));
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data from ${filePath}:`, error);
    return null;
  }
}

async function writeData(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing data to ${filePath}:`, error);
    return false;
  }
}

export {
  initializeDatabase,
  readData,
  writeData,
  USERS_PATH,
  PETS_PATH
};