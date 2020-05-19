import { uuid } from 'uuidv4';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppoitmentsRepository from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeApponitmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppoitmentsRepository;

describe('Create new appointments', () => {
	beforeEach(() => {
		fakeApponitmentRepository = new FakeAppointmentsRepository();
		createAppointment = new CreateAppoitmentsRepository(
			fakeApponitmentRepository,
		);
	});
	it('must be able to create an appointment', async () => {
		const appointment = await createAppointment.execute({
			date: new Date(),
			provider_id: uuid(),
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe(appointment.provider_id);
	});
	it('should not be possible to create two schedules at the same time', async () => {
		const appointmentDate = new Date(2000, 4, 11, 10);

		await createAppointment.execute({
			date: appointmentDate,
			provider_id: uuid(),
		});
		await expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
