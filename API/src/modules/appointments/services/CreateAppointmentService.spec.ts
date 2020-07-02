import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeApponitmentRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('Create new appointments', () => {
	beforeEach(() => {
		fakeApponitmentRepository = new FakeAppointmentsRepository();
		fakeCacheProvider = new FakeCacheProvider();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		createAppointment = new CreateAppointmentService(
			fakeApponitmentRepository,
			fakeNotificationsRepository,
			fakeCacheProvider,
		);
	});
	it('Should be able to create an appointment', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 11).getTime();
		});
		const appointment = await createAppointment.execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: '222',
			user_id: '12345',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('222');
	});
	it('should not be possible to create two schedules at the same time', async () => {
		// Deve ser maior que a data atual.
		const appointmentDate = new Date(2020, 5, 20, 11);

		await createAppointment.execute({
			date: appointmentDate,
			provider_id: '222',
			user_id: '123456',
		});
		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: '222',
				user_id: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('Should not be able to create an appointments on a past date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});
		await expect(
			createAppointment.execute({
				date: new Date(2020, 4, 10, 10),
				provider_id: '222',
				user_id: '12345',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
	it('Should not be able to create an appointments with same user a provider', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});
		await expect(
			createAppointment.execute({
				provider_id: 'user',
				user_id: 'user',
				date: new Date(2020, 4, 20, 10),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('Should not be able to create an appointments before 8am and after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});
		await expect(
			createAppointment.execute({
				date: new Date(2020, 4, 11, 7),
				provider_id: '12345',
				user_id: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
		await expect(
			createAppointment.execute({
				date: new Date(2020, 4, 11, 18),
				provider_id: '12345',
				user_id: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
