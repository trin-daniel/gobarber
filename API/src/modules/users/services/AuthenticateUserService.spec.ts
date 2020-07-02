import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakesHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRespository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUsersServices;
let authenticateUser: AuthenticateUsersService;
describe('Authenticate', () => {
	beforeEach(() => {
		fakeUsersRespository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		fakeHashProvider = new FakeHashProvider();
		createUser = new CreateUsersServices(
			fakeUsersRespository,
			fakeHashProvider,
			fakeCacheProvider,
		);
		authenticateUser = new AuthenticateUsersService(
			fakeUsersRespository,
			fakeHashProvider,
		);
	});

	it('Should be able to authenticate', async () => {
		const user = await fakeUsersRespository.create({
			name: 'Jhon bobs',
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});
		const response = await authenticateUser.execute({
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});
		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('Should no be able authenticate with non existing user', async () => {
		expect(
			authenticateUser.execute({
				email: 'jhonbobs@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to authenticate with wrong password', async () => {
		await createUser.execute({
			name: 'Jhon bobs',
			email: 'jhonbobs@gmail.com',
			password: '123456',
		});

		expect(
			authenticateUser.execute({
				email: 'jhonbobs@gmail.com',
				password: 'passwordnomatch',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
