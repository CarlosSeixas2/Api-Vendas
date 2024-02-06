import Handlebars from 'handlebars';
import fs from 'fs/promises';

interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

const HandlebarsMailTemplate = {
    async parse({ file, variables }: IParseMailTemplate): Promise<string> {
        const template = await fs.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = Handlebars.compile(template);
        return parseTemplate(variables);
    },
};

export default HandlebarsMailTemplate;
