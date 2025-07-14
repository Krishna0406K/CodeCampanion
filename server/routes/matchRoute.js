import express from 'express';
import { getCrossPLatformMatches } from '../controllers/matchcontrollers.js';

const router = express.Router();

router.post('/find',getCrossPLatformMatches);

export default router;