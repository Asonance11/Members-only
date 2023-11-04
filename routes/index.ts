import express, { NextFunction, Request, Response } from 'express';
import {
	login_get,
	login_post,
	logout_get,
	signup_get,
	signup_post,
} from '../controllers/authContoller';
import {
	admin_get,
	admin_post,
	member_get,
	member_post,
} from '../controllers/userController';

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

// become a member
router.get('/member', member_get);
router.post('/member', member_post);

// become an admin

router.get('/admin', admin_get);
router.post('/admin', admin_post);

export default router;
