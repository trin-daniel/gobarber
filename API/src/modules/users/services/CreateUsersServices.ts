import { inject, injectable } from 'tsyringe';
import Users from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
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
		await this.cacheProvider.invalidatePrefix('providers');

		return createUser;
	}
}

export default CreateUsersService;
