import { IContext } from '../../../../types/index.js';
import { IUserWord } from '../../../../db/types.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import db from '../../../../db/index.js';

interface IUpdateWord {
  id: string;
  lastUse: number;
}

interface IUpdateWordsArgs {
  languageId: string;
  words: IUpdateWord[];
}

async function updateWords(args: IUpdateWordsArgs, context: IContext): Promise<boolean> {
  const { languageId, words } = args;
  const user = await getUserFromContext(context, { words: 1 });
  const language = await db.Language.findById(languageId);

  if (!language) {
    throw new Error('Language not supported');
  }

  words.forEach((word: IUpdateWord) => {
    const wordIndexToUpdate = user.words.findIndex((userWord: IUserWord) => userWord.id.toString() === word.id);

    if (wordIndexToUpdate !== -1) {
      user.words[wordIndexToUpdate].lastUse = new Date(word.lastUse);
      user.markModified('words');
    }
  });

  await user.save();

  return true;
}

export default updateWords;
