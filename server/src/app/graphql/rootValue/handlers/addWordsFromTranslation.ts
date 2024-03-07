import { v4 as uuidv4 } from 'uuid';
import { IContext, ILanguage, ILanguageWord, IUserLanguage, IUserWord } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import getNormalizedWord from '../../../functions/getNormalizedWord.js';
import translateText from '../../../functions/translateText.js';
import { IUserWordEdge } from '../types.js';

async function addWordsFromTranslation(
  { languageId, translations }: { languageId: string; translations: string[] },
  context: IContext,
) {
  const user = getUserFromContext(context);
  const language = context.db.languages.find((language: ILanguage) => language.id === languageId);

  if (!language) {
    throw new Error('Language not found');
  }

  let userLanguage = user.languages.find((language: IUserLanguage) => language.id === languageId);

  if (!userLanguage) {
    userLanguage = { id: languageId, words: [] };
    user.languages.push(userLanguage);
  }

  const { translationsToCreate, languageWords } = translations.reduce(
    (result: { translationsToCreate: string[]; languageWords: string[] }, translation: string) => {
      const normalizedTranslation = getNormalizedWord(translation, language.translationCode);

      if (!normalizedTranslation) return result;

      const languageWord = language.words.find(
        (languageWord: ILanguageWord) => languageWord.translation === normalizedTranslation,
      );

      if (languageWord) {
        return {
          ...result,
          languageWords: [...result.languageWords, languageWord],
        };
      }

      return {
        ...result,
        translationsToCreate: [...result.translationsToCreate, normalizedTranslation],
      };
    },
    { translationsToCreate: [], languageWords: [] },
  );

  const translatedWords = await translateText(translationsToCreate, language.translationCode, language.code);

  const languageWordsNew = translatedWords.map((word: string, id: number) => {
    return { id: uuidv4(), word: word.toLowerCase(), translation: translationsToCreate[id] };
  });

  const userWords = [...languageWords, ...languageWordsNew]
    .filter((languageWord: ILanguageWord) => {
      return !userLanguage.words.find((userWord: IUserWord) => userWord.id === languageWord.id);
    })
    .map((languageWord: ILanguageWord) => {
      return { id: languageWord.id, lastUse: 0 };
    });

  userLanguage.words = [...userWords, ...userLanguage.words];
  language.words = [...languageWordsNew, ...language.words];

  return userWords.reduce((result: IUserWordEdge[], userWord: IUserWord) => {
    const languageWord = language.words.find((languageWord: ILanguageWord) => languageWord.id === userWord.id);

    if (!languageWord) {
      return result;
    }

    return [...result, { ...languageWord, lastUse: userWord.lastUse }];
  }, []);
}

export default addWordsFromTranslation;
