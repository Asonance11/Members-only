import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
export const signup_get = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.render('signup', {
		title: 'Sign up',
	});
};

export const signup_post = [
	body('username')
		.trim()
		.isLength({ min: 1 })
		.withMessage('Username must consist of at least on character'),
	body('password')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('Password must be more than one character'),
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('signup', {
				title: 'Sign up',
				errors: errors.array(),
			});
			return;
		}
		try {
			const userExists = await User.findOne({ username: req.body.username });

			if (userExists) {
				res.render('signup', {
					title: 'Sign up',
					errors: [{ msg: 'Username already exists' }],
				});
				return;
			}

			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const user = new User({
				username: req.body.username,
				password: hashedPassword,
				member: false,
				admin: false,
			});

			await user.save();

			res.redirect('/');
		} catch (error) {
			return next(error);
		}
	},
];
