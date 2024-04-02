import { IContext } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import translateText from '../../../functions/translateText.js';
import db from '../../../../db/index.js';
import { IUserWord, IWord } from '../../../../db/types.js';
import getNormalizedWord from '../../../functions/getNormalizedWord.js';

interface IAddWordsArgs {
  languageId: string;
  translations: string[];
}

async function addWordsFromTranslation(args: IAddWordsArgs, context: IContext): Promise<IUserWord[]> {
  const { languageId, translations } = args;
  const user = await getUserFromContext(context, { words: 1 });
  const language = await db.Language.findById(languageId);

  if (!language) {
    throw new Error('Language not supported');
  }

  const normalizedTranslations = translations.reduce((result: string[], translation: string) => {
    const normalizedTranslation = getNormalizedWord(translation, language.translationCode);

    if (normalizedTranslation) {
      result.push(normalizedTranslation);
    }

    return result;
  }, []);
  const existingWords = await db.Word.find({ languageId, translation: { $in: normalizedTranslations } });
  const translationsToCreate = normalizedTranslations.filter(
    translation => !existingWords.some(word => word.translation === translation),
  );
  const translatedWords = await translateText(translationsToCreate, language.translationCode, language.code);
  const createdWords = translatedWords.map((wordString: string, id: number) => {
    const word = new db.Word({
      languageId,
      word: wordString,
      translation: translationsToCreate[id],
    });

    word.save();

    return word;
  });

  const createdUserWords = [...existingWords, ...createdWords].reduce((result: IUserWord[], word: IWord) => {
    const userWordIndex = user.words.findIndex((userWord: IUserWord) => userWord.wordId === word.id);

    if (userWordIndex === -1) {
      const userWord = {
        id: word.id,
        // TODO replace wordId with id
        wordId: word.id,
        languageId: language.id,
        lastUse: new Date(0),
        createdAt: new Date(),
        word: word.word,
        translation: word.translation,
      };

      user.words.push(userWord);
      user.markModified('words');
      result.push(userWord);
    }

    return result;
  }, []);

  await user.save();

  return createdUserWords;
}

export default addWordsFromTranslation;
