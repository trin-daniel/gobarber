import { startOfHour } from 'date-fns';
import {injectable, inject} from 'tsyringe';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';



interface Request {
	provider_id: string;
	date: Date;
}
@injectable()
class CreateAppointmentServices {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository : IAppointmentsRepository
		){}
	public async execute({ provider_id, date }: Request): Promise<Appointments> {

		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});
		return appointment;
	}
}

export default CreateAppointmentServices;
