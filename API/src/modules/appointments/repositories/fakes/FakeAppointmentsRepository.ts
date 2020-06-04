import { uuid } from 'uuidv4';

import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointments';

class AppointmetsRepository implements IAppointmentsRepository {
	private appointments: Appointment[] = [];

	public async findByDate(
		date: Date,
		provider_id: string,
	): Promise<Appointment | undefined> {
		const findApponitment = this.appointments.find(
			(appointment) =>
				isEqual(appointment.date, date) &&
				appointment.provider_id === provider_id,
		);
		return findApponitment;
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(
			(appointment) =>
				appointment.provider_id === provider_id &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
		return appointments;
	}

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		const appointments = this.appointments.filter(
			(appointment) =>
				appointment.provider_id === provider_id &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
		return appointments;
	}

	public async create({
		provider_id,
		date,
		user_id,
	}: ICreateAppointmentsDTO): Promise<Appointment> {
		const appointment = new Appointment();
		Object.assign(appointment, { id: uuid(), date, provider_id, user_id });
		this.appointments.push(appointment);
		return appointment;
	}
}
export default AppointmetsRepository;
