import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsServices: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;
describe('List appointments', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProviderAppointmentsServices = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
			fakeCacheProvider,
		);
	});
	it('Should be able list the appointments on specific day', async () => {
		const appointment1 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user',
			date: new Date(2020, 4, 25, 10, 0, 0),
		});
		const appointment2 = await fakeAppointmentsRepository.create({
			provider_id: 'provider_id',
			user_id: 'user',
			date: new Date(2020, 4, 25, 11, 0, 0),
		});

		const appointments = await listProviderAppointmentsServices.execute({
			provider_id: 'provider_id',
			day: 25,
			month: 5,
			year: 2020,
		});
		expect(appointments).toEqual([appointment1, appointment2]);
	});
});
