import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import logger from 'morgan';
import path from 'path';

dotenv.config();

const app: Application = express();

const mongoUrl = process.env.MONGODB_URL || '';

async function main() {
	try {
		await mongoose.connect(mongoUrl);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error(error);
	}
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
