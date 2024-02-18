import { IContext, IUserLanguage, IUserWord } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';

async function removeWords({ languageId, wordIds }: { languageId: string; wordIds: string[] }, context: IContext) {
  const user = getUserFromContext(context);
  const userLanguage = user.languages.find((language: IUserLanguage) => language.id === languageId);

  if (userLanguage) {
    userLanguage.words = userLanguage.words.filter(({ id }: IUserWord) => !wordIds.includes(id));
  }

  return true;
}

export default removeWords;
