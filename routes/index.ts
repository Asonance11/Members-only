import express, { NextFunction, Request, Response } from 'express';
import {
	login_get,
	login_post,
	logout_get,
	signup_get,
	signup_post,
} from '../controllers/authContoller';
import {
	create_message_get,
	create_message_post,
} from '../controllers/messageController';
import {
	admin_get,
	admin_post,
	member_get,
	member_post,
} from '../controllers/userController';
import Message from '../models/messages';

const router = express.Router();

// index
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allMessages = await Message.find({})
			.sort({ createdAt: -1 })
			.populate('user');
		res.render('index', {
			title: 'Members Only',
			user: req.user,
			messages: allMessages,
		});
	} catch (error) {
		return next(error);
	}
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

// Create a message
router.get('/create-message', create_message_get);
router.post('/create-message', create_message_post);

export default router;
