import express from 'express';
import { signup_get, signup_post } from '../controllers/authContoller';

const router = express.Router();

router.get('/signup', signup_get);
router.post('/signup', signup_post);

export default router;
