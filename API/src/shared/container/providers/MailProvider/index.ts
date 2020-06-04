import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvier from '@shared/container/providers/MailProvider/models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(SESMailProvider),
};
container.registerInstance<IMailProvier>(
	'MailProvider',
	providers[mailConfig.driver],
);
