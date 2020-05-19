import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakesHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('Update profile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		updateProfileService = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('Should be able update the profile', async () => {
		const createUser = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});

		const updated = await updateProfileService.execute({
			user_id: createUser.id,
			name: 'Jhonny deep',
			email: 'jhonny@teste.com.br',
		});
		expect(updated.name).toBe('Jhonny deep');
		expect(updated.email).toBe('jhonny@teste.com.br');
	});
	it('Should not be able update the profile from non-existing user', async () => {
		await expect(
			updateProfileService.execute({
				user_id: 'non-existing-user-id',
				name: 'test',
				email: 'test@test.com.br',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('should not be able to update the user if it does not exist', async () => {
		await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});
		const createUser = await fakeUsersRepository.create({
			name: 'Jhony Decarte',
			email: 'teste@teste.com.br',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: createUser.id,
				name: 'Jhon Deca',
				email: 'jhondeca@teste.com.br',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should be able to update the password', async () => {
		const createUser = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});

		const updated = await updateProfileService.execute({
			user_id: createUser.id,
			name: 'Jhonny deep',
			email: 'jhonny@teste.com.br',
			old_password: '123456',
			password: '123123',
		});
		expect(updated.password).toBe('123123');
	});

	it('Should not be able to update the password without old password', async () => {
		const createUser = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: createUser.id,
				name: 'Jhonny deep',
				email: 'jhonny@teste.com.br',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to update the password with wrong old password', async () => {
		const createUser = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});

		await expect(
			updateProfileService.execute({
				user_id: createUser.id,
				name: 'Jhonny deep',
				email: 'jhonny@teste.com.br',
				old_password: 'wrong-old-password',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
