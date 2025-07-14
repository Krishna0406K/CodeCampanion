import express from 'express';
import { getCodeforcesProblems } from '../controllers/codeForcesController.js';

const router = express.Router();

router.get('/problems',getCodeforcesProblems);

export default router;