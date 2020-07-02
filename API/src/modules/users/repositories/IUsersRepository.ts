import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProviderDTO';

export default interface IUsersRepository {
	findAllProviders(data?: IFindAllProvidersDTO): Promise<User[]>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	create(data: ICreateUserDTO): Promise<User>;
	save(user: User): Promise<User>;
}
