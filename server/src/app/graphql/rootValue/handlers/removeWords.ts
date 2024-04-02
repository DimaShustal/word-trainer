import { IContext } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IUserWord } from '../../../../db/types.js';

interface IRemoveWordsArgs {
  languageId: string;
  wordIds: string[];
}

async function removeWords(args: IRemoveWordsArgs, context: IContext) {
  const { wordIds } = args;
  const user = await getUserFromContext(context, { words: 1 });

  user.words = user.words.filter((word: IUserWord) => !wordIds.includes(word.id.toString()));
  user.markModified('words');

  await user.save();

  return true;
}

export default removeWords;
