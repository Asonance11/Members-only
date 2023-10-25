import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
export const user_create_get = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		res.render('signup', {
			title: 'Sign up',
		});
	}
);
