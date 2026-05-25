import express from 'express';
import { register, login, logout, getApiKey } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/me/api-key', authMiddleware, getApiKey);

export default router;