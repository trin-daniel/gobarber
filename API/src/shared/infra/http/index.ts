import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);
app.use(errors());
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'Error',
				message: err.message,
			});
		}
		return response.status(500).json({
			status: 'error',
			message: err.message,
		});
	},
);

app.listen(3333, () => {
	console.log('Em execução!');
});
