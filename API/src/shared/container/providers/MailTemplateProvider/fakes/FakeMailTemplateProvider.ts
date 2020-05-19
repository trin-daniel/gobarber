// import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
	public async parser(): Promise<string> {
		return 'Mail template';
	}
}
export default FakeMailTemplateProvider;
