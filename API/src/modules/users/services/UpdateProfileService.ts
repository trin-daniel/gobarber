import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/Users';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	old_password?: string;
	password?: string;
}
@injectable()
class UpdateProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		user_id,
		name,
		email,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const findUser = await this.usersRepository.findById(user_id);
		if (!findUser) {
			throw new AppError('User not found.');
		}
		const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
			throw new AppError('E-mail already in use.');
		}

		findUser.name = name;
		findUser.email = email;
		if (password && !old_password) {
			throw new AppError(
				'You need to inform the old password to set a new passoword',
			);
		}
		if (password && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(
				old_password,
				findUser.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}
			findUser.password = await this.hashProvider.generateHash(password);
		}

		return this.usersRepository.save(findUser);
	}
}

export default UpdateProfileService;
