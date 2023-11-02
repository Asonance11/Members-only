import express, { NextFunction, Request, Response } from 'express';
import {
	login_get,
	login_post,
	logout_get,
	signup_get,
	signup_post,
} from '../controllers/authContoller';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.render('index', { title: 'Members Only', user: req.user });
});

// signup
router.get('/signup', signup_get);
router.post('/signup', signup_post);

// Login/ Logout

router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);

export default router;
