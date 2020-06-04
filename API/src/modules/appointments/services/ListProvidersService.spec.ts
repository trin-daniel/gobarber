import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderService: ListProviderService;

describe('List Providers', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProviderService = new ListProviderService(
			fakeUsersRepository,
			fakeCacheProvider,
		);
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
