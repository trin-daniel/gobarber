import FakeRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakesHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeRepository: FakeRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('Reset password', () => {
	beforeEach(() => {
		fakeRepository = new FakeRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeHashProvider = new FakeHashProvider();
		resetPasswordService = new ResetPasswordService(
			fakeRepository,
			fakeUserTokensRepository,
			fakeHashProvider,
		);
	});

	it('Should be able to reset password', async () => {
		const user = await fakeRepository.create({
			name: 'teste',
			email: 'teste@teste.com.br',
			password: '123456',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);
		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		await resetPasswordService.execute({
			password: 'novasenha',
			token,
		});
		const updatedPassword = await fakeRepository.findById(user.id);
		expect(generateHash).toHaveBeenCalledWith('novasenha');
		expect(updatedPassword.password).toBe('novasenha');
	});

	it('Should not be able to reset the password with non-existing token', async () => {
		await expect(
			resetPasswordService.execute({
				token: 'non-existing-token',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to reset the password with non-existing user', async () => {
		const { token } = await fakeUserTokensRepository.generate(
			'non-existing-user',
		);
		await expect(
			resetPasswordService.execute({
				token,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to reset password if passed more than 2 hours', async () => {
		const user = await fakeRepository.create({
			email: 'teste@teste.com.br',
			name: 'teste',
			password: '123456',
		});

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();
			return customDate.setHours(customDate.getHours() + 3);
		});
		const { token } = await fakeUserTokensRepository.generate(user.id);
		await expect(
			resetPasswordService.execute({
				token,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
