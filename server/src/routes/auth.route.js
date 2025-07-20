import express from 'express';
import dotenv from 'dotenv';
import e from 'express';
import { signup } from '../controllers/auth.controller.js';

let router = express.Router();

router.get('/signup', signup);

export default router;