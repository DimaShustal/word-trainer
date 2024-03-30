import { IContext, ILanguage, IUserLanguage, IUserWord } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IUserWordEdge } from '../types.js';

async function updateWords({ languageId, words }: { languageId: string; words: IUserWord[] }, context: IContext) {
  const user = getUserFromContext(context);
  const language = context.db.languages.find((language: ILanguage) => language.id === languageId);

  if (!language) {
    throw new Error('Language not found');
  }

  let userLanguage = user.languages.find((language: IUserLanguage) => language.id === languageId);

  if (!userLanguage) {
    userLanguage = { id: languageId, words: [] };
  }

  words.forEach((word: IUserWordEdge) => {
    userLanguage.words = userLanguage.words.filter((userWord: IUserWord) => userWord.id !== word.id);
    userLanguage.words.push(word);
  });

  return true;
}

export default updateWords;
