import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/users/services/CreateUsersServices';
import { classToClass } from 'class-transformer';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body;
		const createInstanceUser = container.resolve(CreateUsersService);
		const createUser = await createInstanceUser.execute({
			name,
			email,
			password,
		});
		return response.json(classToClass(createUser));
	}
}
