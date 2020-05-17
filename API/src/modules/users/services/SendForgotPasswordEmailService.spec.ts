import FakeRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

	let fakeRepository: FakeRepository;
	let fakeUserTokensRepository: FakeUserTokensRepository;
	let fakeMailProvider: FakeMailProvider;
	let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', ()=>{
	beforeEach(()=>{
		fakeRepository = new FakeRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeMailProvider = new FakeMailProvider();
		sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeRepository, fakeMailProvider, fakeUserTokensRepository);
	})


	it('Should be able recover the password using the email', async ()=>{

		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
		await fakeRepository.create({
			name: 'usuario teste',
			email:'teste@teste.com.br',
			password: '123456'
		})
		await sendForgotPasswordEmail.execute({email: 'teste@teste.com.br'});
		expect(sendMail).toHaveBeenCalled();''
	})

	it('Should not be able revocer password a non-existing user password', async()=>{
		await expect(
			sendForgotPasswordEmail.execute({email: 'teste@teste.com.br'}),
		).rejects.toBeInstanceOf(AppError);
	})

	it('Should generate forgot password token', async ()=>{
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
		const user = await fakeRepository.create({
			email: 'teste@teste.com.br',
			name: 'Jhon',
			password: '123456'
		})

		await sendForgotPasswordEmail.execute({
			email: 'teste@teste.com.br'
		})
		expect(generateToken).toHaveBeenCalledWith(user.id)
	})
})
