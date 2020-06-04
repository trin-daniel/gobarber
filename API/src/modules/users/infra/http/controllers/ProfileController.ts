import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const user_id = request.user.id;
		const showProfile = container.resolve(ShowProfileService);
		const user = await showProfile.execute({ user_id });
		delete user.password;
		return response.json(classToClass(user));
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, email, password, old_password } = request.body;
		const user_id = request.user.id;
		const createInstanceUser = container.resolve(UpdateProfileService);
		const createUser = await createInstanceUser.execute({
			user_id,
			name,
			email,
			old_password,
			password,
		});
		return response.json(classToClass(createUser));
	}
}
