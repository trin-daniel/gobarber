import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
	provider_id: string;
	date: Date;
	user_id: string;
}
@injectable()
class CreateAppointmentServices {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,
		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,
		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		provider_id,
		user_id,
		date,
	}: IRequest): Promise<Appointments> {
		const appointmentDate = startOfHour(date);
		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't create an appointment on a past date.");
		}
		if (user_id === provider_id) {
			throw new AppError("You can't create appointment with yourself.");
		}
		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError('You can create appointments  between 8am and 17pm');
		}
		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate,
			provider_id,
		);

		if (findAppointmentInSameDate) {
			throw new AppError('this appointment is already booked');
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
			user_id,
		});
		const formatDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");
		await this.notificationsRepository.create({
			recipient_id: provider_id,
			content: `Novo agendamento para o dia ${formatDate}`,
		});

		await this.cacheProvider.invalidate(
			`appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`,
		);
		return appointment;
	}
}

export default CreateAppointmentServices;
