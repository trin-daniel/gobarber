import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
	user_id: string;
}
@injectable()
class ListProvidersService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({ user_id }: IRequest): Promise<User[]> {
		let users = await this.cacheProvider.recover<User[]>(
			`providers:${user_id}`,
		);
		if (!users) {
			users = await this.usersRepository.findAllProviders({
				execept_user_id: user_id,
			});
			await this.cacheProvider.save(
				`providers:${user_id}`,
				classToClass(users),
			);
		}
		return users;
	}
}
export default ListProvidersService;
