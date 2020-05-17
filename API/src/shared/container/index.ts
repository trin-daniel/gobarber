import { container } from 'tsyringe';

import IApponitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IMailProvier from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import '@modules/users/providers';
import IMailTemplateProvider from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IApponitmentsRepository>(
	'AppointmentsRepository',
	AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository,
);
container.registerSingleton<IMailTemplateProvider>(
	'MailTemplateProvider',
	HandlebarsMailTemplateProvider,
);
container.registerInstance<IMailProvier>(
	'MailProvider',
	container.resolve(EtherealMailProvider),
);
