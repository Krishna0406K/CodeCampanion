import express from 'express';
import { getAISolution} from '../controllers/explaincontrollers.js';

const router = express.Router();

router.post('/generate',getAISolution);

export default router;