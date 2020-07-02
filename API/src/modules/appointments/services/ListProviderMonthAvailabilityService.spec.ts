import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import AppError from '@shared/errors/AppError';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeApponitmentRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('List provider Month available', () => {
	beforeEach(() => {
		fakeApponitmentRepository = new FakeAppointmentsRepository();
		listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
			fakeApponitmentRepository,
		);
	});
	it('Should be able list the month availability from provider', async () => {
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 8, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 9, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 10, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 11, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 12, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 13, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 16, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 20, 17, 0, 0),
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			user_id: '2345userid',
			date: new Date(2020, 4, 22, 8, 0, 0),
		});

		const availability = await listProviderMonthAvailabilityService.execute({
			provider_id: '12eded2e',
			year: 2020,
			month: 5,
		});
		expect(availability).toEqual(
			expect.arrayContaining([
				{ day: 19, available: true },
				{ day: 20, available: false },
				{ day: 21, available: true },
				{ day: 22, available: true },
			]),
		);
	});
});
