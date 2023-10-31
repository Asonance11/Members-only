import express from 'express';
import { signup_get } from '../controllers/authContoller';

const router = express.Router();

router.get('/signup', signup_get);

export default router;
