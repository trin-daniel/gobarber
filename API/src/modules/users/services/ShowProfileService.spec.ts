import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('Update profile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it('Should be able show the profile the user', async () => {
		const createUser = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});

		const profile = await showProfileService.execute({
			user_id: createUser.id,
		});
		expect(profile.name).toBe('Jhon Deca');
		expect(profile.email).toBe('jhondeca@teste.com.br');
	});
	it('Should not be able show the profile from non-existing user', async () => {
		await expect(
			showProfileService.execute({
				user_id: 'non-existing-user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
