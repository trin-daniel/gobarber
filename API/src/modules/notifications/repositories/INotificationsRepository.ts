import IcreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
	create(data: IcreateNotificationDTO): Promise<Notification>;
}
