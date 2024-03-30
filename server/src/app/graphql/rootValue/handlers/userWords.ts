import { IContext, ILanguage, ILanguageWord, IUserLanguage, IUserWord } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IUserWordsResponse } from '../types.js';

async function userWords(
  { languageId, offset, limit }: { languageId: string; offset: number; limit: number },
  context: IContext,
): Promise<IUserWordsResponse> {
  const user = getUserFromContext(context);
  const userWords = user.languages.find((language: IUserLanguage) => language.id === languageId)?.words || [];
  const languageWords = context.db.languages.find((language: ILanguage) => language.id === languageId)?.words || [];

  const startIndex = offset;
  const endIndex = offset + limit;

  const edges = userWords.slice(startIndex, endIndex).map((userWord: IUserWord) => {
    const word = languageWords.find((languageWords: ILanguageWord) => languageWords.id === userWord.id);

    return { ...word, ...userWord };
  });

  return {
    edges,
    pageInfo: {
      totalCount: userWords.length,
      hasNextPage: userWords.length > endIndex,
    },
  };
}

export default userWords;
