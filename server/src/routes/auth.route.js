import express from 'express';
import dotenv from 'dotenv';
import e from 'express';
import { signup, verfiyEmail } from '../controllers/auth.controller.js';

let router = express.Router();

router.post('/signup', signup);
router.post('/verifyEmail', verfiyEmail);


export default router;