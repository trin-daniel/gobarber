import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakesHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import AppError from '@shared/errors/AppError';
import CreateUsersServices from './CreateUsersServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUsersServices: CreateUsersServices;

describe('Create new User', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		fakeHashProvider = new FakeHashProvider();
		createUsersServices = new CreateUsersServices(
			fakeUsersRepository,
			fakeHashProvider,
			fakeCacheProvider,
		);
	});
	it('Should be able to create a new user', async () => {
		const createUser = await createUsersServices.execute({
			email: 'test@test.com.br',
			name: 'Jw quest',
			password: '12345',
		});
		expect(createUser).toHaveProperty('id');
	});
	it('should not be able to create a user with an email already registered.', async () => {
		await createUsersServices.execute({
			email: 'test@test.com.br',
			name: 'Jw quest',
			password: '12345',
		});
		await expect(
			createUsersServices.execute({
				email: 'test@test.com.br',
				name: 'Jw quest',
				password: '12345',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
