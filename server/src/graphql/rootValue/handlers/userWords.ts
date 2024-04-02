import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IContext, IUserWord } from '../../../types/index.js';

interface IUserWordsArgs {
  languageId: string;
  offset: number;
  limit: number;
}

interface IUserWordsResponse {
  edges: IUserWord[];
  pageInfo: {
    totalCount: number;
    hasNextPage: boolean;
  };
}

async function userWords(args: IUserWordsArgs, context: IContext): Promise<IUserWordsResponse> {
  const { languageId, offset, limit } = args;
  const user = await getUserFromContext(context, { words: 1 });
  const startIndex = offset;
  const endIndex = offset + limit;
  const languageWords = user.words
    .filter((word: IUserWord) => word.languageId.toString() === languageId)
    .sort((a: IUserWord, b: IUserWord) => (a.createdAt > b.createdAt ? -1 : 1));
  const edges = languageWords.slice(startIndex, endIndex);

  return {
    edges,
    pageInfo: {
      totalCount: languageWords.length,
      hasNextPage: languageWords.length > endIndex,
    },
  };
}

export default userWords;
