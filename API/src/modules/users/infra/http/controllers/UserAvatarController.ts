import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
	public async update(request: Request, response: Response): Promise<Response> {
		const UpadateUserAvatar = container.resolve(UpdateUserAvatarService);
		const userAvatar = await UpadateUserAvatar.execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		});
		return response.json(classToClass(userAvatar));
	}
}
