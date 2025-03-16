import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoutes.js';

// Initialize environment variables
dotenv.config();

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/pets', petRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(staticPath));
  
  // For any request that doesn't match an API route, send the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Initialize database and start server
await initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;