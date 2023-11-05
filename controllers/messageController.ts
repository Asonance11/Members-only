import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Message from '../models/messages';

export const create_message_get = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!res.locals.currentUser) {
		res.redirect('/login');
	}

	res.render('message', {
		title: 'Create a Message - Members Only',
		user: res.locals.currentUser,
	});
};

export const create_message_post = [
	body('title').trim().isLength({ min: 1 }).withMessage('Type a title'),
	body('text')
		.trim()
		.isLength({ min: 3 })
		.withMessage('Message must be at least 3 characters'),
	async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		try {
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const message = new Message({
				user: res.locals.currentUser._id,
				title: req.body.title,
				text: req.body.text,
			});

			await message.save();
		} catch (error) {
			res.render('message', {
				title: 'Create a Message - Members Only',
				errors: error,
			});
		}
	},
];
