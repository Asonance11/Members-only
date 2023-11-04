import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';

export const member_get = (req: Request, res: Response, next: NextFunction) => {
	if (!res.locals.currentUser) {
		res.redirect('/login');
	}
	res.render('member', {
		title: 'Become a member - Members Only',
		user: res.locals.currentUser,
	});
};

export const member_post = [
	body('password').trim().isLength({ min: 1 }).withMessage('Type a password'),
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		const currentUser = res.locals.currentUser;
		const title = 'Become a member - Members Only';

		try {
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const { password } = req.body;

			if (password !== process.env.MEMBER_PASSWORD) {
				throw [{ msg: 'Wrong Passcode' }];
			}

			await User.findByIdAndUpdate(currentUser._id, { member: true }, {});
			res.redirect('/member');
		} catch (error) {
			res.render('member', {
				title,
				user: currentUser,
				errors: error,
			});
		}
	},
];
