import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import User from '../models/user';
export const signup_get = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.render('signup', {
		title: 'Sign up - Members Only',
	});
};

export const signup_post = [
	body('username')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Username must consist of at least 3 characters'),
	body('password')
		.trim()
		.isLength({ min: 6 })
		.escape()
		.withMessage('Password must consist of at least 6 characters'),
	body('confirm_password')
		.trim()
		.escape()
		.custom(async (value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords must be the same');
			}
		}),
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('signup', {
				title: 'Sign up - Members Only',
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

// Login
export const login_get = (req: Request, res: Response) => {
	if (res.locals.currentUser) {
		res.redirect('/');
	}
	res.render('login', {
		title: 'Log in - Members Only',
		error: req.flash('Error Logging in'),
	});
};

export const login_post = [
	body('username')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Username must consist of at least 3 characters'),
	body('password')
		.trim()
		.isLength({ min: 6 })
		.escape()
		.withMessage('Password must consist of at least 6 characters'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.render('login', {
				title: 'Log in - Members Only',
				errors: errors.array(),
			});
		}
		next();
	},
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
	}),
];

export const logout_get = (req: Request, res: Response, next: NextFunction) => {
	req.logout((err) => {
		if (err) return next(err);
	});
	res.redirect('/');
};
