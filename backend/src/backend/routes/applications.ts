import express from 'express';
import { 
  getAllApplications, 
  getApplicationByName, 
  createApplication, 
  deleteApplication 
} from '../controllers/applicationController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware); // All routes protected

router.get('/', getAllApplications);
router.get('/:name', getApplicationByName);
router.post('/', createApplication);
router.delete('/:name', deleteApplication);

export default router;