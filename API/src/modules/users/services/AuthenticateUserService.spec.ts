import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakesHashProvider';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

describe('Authenticate', ()=>{
	it('Should be able to authenticate', async()=>{
		const fakeUsersRespository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider()
		const createUser = new CreateUsersServices(fakeUsersRespository, fakeHashProvider);
		const authenticateUser = new AuthenticateUsersService(fakeUsersRespository, fakeHashProvider);

		const user = await createUser.execute({
			name: 'Jhon bobs',
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});
		const response =  await authenticateUser.execute({
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});
		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	})

	it('Should no be able authenticate with non existing user', async()=>{
		const fakeUsersRespository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider()

		const authenticateUser = new AuthenticateUsersService(fakeUsersRespository, fakeHashProvider);
		expect(authenticateUser.execute({
			email: 'jhonbobs@gmail.com',
			password: '123456',
		})).rejects.toBeInstanceOf(AppError)
	});

	it('Should not be able to authenticate with wrong password', async()=>{
		const fakeUsersRespository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider()
		const createUser = new CreateUsersServices(fakeUsersRespository, fakeHashProvider);
		const authenticateUser = new AuthenticateUsersService(fakeUsersRespository, fakeHashProvider);

		const user = await createUser.execute({
			name: 'Jhon bobs',
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});

		expect(authenticateUser.execute({
			email: 'jhonbobs@gmail.com',
			password: 'passwordnomatch',
		})).rejects.toBeInstanceOf(AppError);
	})



})
