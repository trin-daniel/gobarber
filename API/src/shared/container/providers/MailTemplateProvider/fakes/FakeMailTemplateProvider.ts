import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
	public async parser({
		template,
		variables,
	}: IParseMailTemplateDTO): Promise<string> {
		return template;
	}
}
export default FakeMailTemplateProvider;
