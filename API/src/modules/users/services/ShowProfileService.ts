import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
}
@injectable()
class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ user_id }: IRequest): Promise<User> {
		const findUser = await this.usersRepository.findById(user_id);
		if (!findUser) {
			throw new AppError('User not found.');
		}
		return findUser;
	}
}

export default ShowProfileService;
