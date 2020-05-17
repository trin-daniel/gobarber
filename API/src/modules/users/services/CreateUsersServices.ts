import { inject, injectable } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}
@injectable()
class CreateUsersService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ name, email, password }: IRequest): Promise<Users> {
		const searchForUser = await this.usersRepository.findByEmail(email);
		if (searchForUser) {
			throw new AppError('user already exists');
		}
		const hashPassword = await this.hashProvider.generateHash(password);

		const createUser = await this.usersRepository.create({
			name,
			email,
			password: hashPassword,
		});

		return createUser;
	}
}

export default CreateUsersService;
