import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakesHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUsersServices from './CreateUsersServices';

describe('Create new User', () => {
	it('Should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUsersServices = new CreateUsersServices(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const createUser = await createUsersServices.execute({
			email: 'test@test.com.br',
			name: 'Jw quest',
			password: '12345',
		});
		expect(createUser).toHaveProperty('id');
	});
	it('should not be able to create a user with an email already registered.', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUsersServices = new CreateUsersServices(
			fakeUsersRepository,
			fakeHashProvider,
		);

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
