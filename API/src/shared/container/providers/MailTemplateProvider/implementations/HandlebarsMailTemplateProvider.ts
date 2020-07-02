import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
	public async parser({
		file,
		variables,
	}: IParseMailTemplateDTO): Promise<string> {
		const contentTemplate = await fs.promises.readFile(file, {
			encoding: 'utf-8',
		});
		const parseTemplate = handlebars.compile(contentTemplate);
		return parseTemplate(variables);
	}
}
export default HandlebarsMailTemplateProvider;
