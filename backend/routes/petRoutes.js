import express from 'express';
import { registerPet, getUserPets, getAllPets } from '../controllers/petController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, registerPet);
router.get('/user', authenticateToken, getUserPets);
router.get('/', getAllPets);

export default router;