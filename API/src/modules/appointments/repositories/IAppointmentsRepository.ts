import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

export default interface IRepositoryAppointment {
	create(formatData: ICreateAppointmentsDTO): Promise<Appointment>;
	findByDate(date: Date): Promise<Appointment | undefined>;
}
