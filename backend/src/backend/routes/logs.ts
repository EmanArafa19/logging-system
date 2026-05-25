import express from 'express';
import { getAllLogs, createLog } from '../controllers/logController';
import { authMiddleware } from '../middleware/auth';
import { apiKeyAuth } from '../middleware/apiKeyAuth';

const router = express.Router();
router.get('/applications/:name/logs', authMiddleware, getAllLogs)
router.post('/applications/:name/logs', apiKeyAuth, createLog);

export default router;