import express from 'express';
import { user_create_get } from '../controllers/authContoller';

const router = express.Router();

router.get('/signup', user_create_get);

export default router;
