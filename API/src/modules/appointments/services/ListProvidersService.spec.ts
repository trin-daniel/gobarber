import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProviderService;

describe('List Providers', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listProviderService = new ListProviderService(fakeUsersRepository);
	});

	it('Should be able to list the providers', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'Jhon Deca',
			email: 'jhondeca@teste.com.br',
			password: '123456',
		});
		const user2 = await fakeUsersRepository.create({
			name: 'Jhonnny',
			email: 'teste@spec.com.br',
			password: '123456',
		});
		const loaggedUser = await fakeUsersRepository.create({
			name: 'Jhonnny Quan',
			email: 'quantteste@spec.com.br',
			password: '1234567',
		});

		const providers = await listProviderService.execute({
			user_id: loaggedUser.id,
		});
		expect(providers).toEqual([user1, user2]);
	});
});
