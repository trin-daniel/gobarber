import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
// import AppError from '@shared/errors/AppError';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeApponitmentRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('List provider Month available', () => {
	beforeEach(() => {
		fakeApponitmentRepository = new FakeAppointmentsRepository();
		listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
			fakeApponitmentRepository,
		);
	});
	it('Should be able list the day availability from provider', async () => {
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			date: new Date(2020, 4, 20, 14, 0, 0),
			user_id: '2345userid',
		});
		await fakeApponitmentRepository.create({
			provider_id: '12eded2e',
			date: new Date(2020, 4, 20, 15, 0, 0),
			user_id: '235userid',
		});
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 20, 11).getTime();
		});

		const availability = await listProviderDayAvailabilityService.execute({
			provider_id: '12eded2e',
			year: 2020,
			day: 20,
			month: 5,
		});
		expect(availability).toEqual(
			expect.arrayContaining([
				{ hour: 8, available: false },
				{ hour: 9, available: false },
				{ hour: 10, available: false },
				// { hour: 11, available: true },
				// { hour: 12, available: false },
				{ hour: 13, available: true },
				{ hour: 14, available: false },
				{ hour: 15, available: false },
				{ hour: 16, available: true },
			]),
		);
	});
});
