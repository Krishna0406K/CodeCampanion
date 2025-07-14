import express from 'express';
import { fetchVideoSolutions } from '../controllers/youtubecontrollers.js';

const router = express.Router();

router.post('/search',fetchVideoSolutions);

export default router;