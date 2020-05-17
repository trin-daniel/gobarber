import {uuid} from 'uuidv4';

import { isEqual } from 'date-fns';
import IAppointmentsRepository from '../IAppointmentsRepository';
import ICreateAppointmentsDTO from '../../dtos/ICreateAppointmentsDTO';
import Appointment from '../../infra/typeorm/entities/Appointments';
class AppointmetsRepository implements IAppointmentsRepository {
	private appointments : Appointment[] = [];
	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findApponitment = this.appointments.find(appointment => isEqual(appointment.date, date));
		return findApponitment;
	}

	public async create({
		provider_id,
		date,
	}: ICreateAppointmentsDTO): Promise<Appointment> {
		const appointment = new Appointment();
		Object.assign(appointment, {id: uuid(), date, provider_id});
		this.appointments.push(appointment);
		return appointment;
	}
}
export default AppointmetsRepository;
