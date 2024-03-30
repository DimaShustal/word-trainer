import { IContext, ILanguage } from '../../../../types/index.js';

async function languages(_: never, context: IContext): Promise<ILanguage[]> {
  return context.db.languages;
}

export default languages;
