import { buildSchema } from 'graphql';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from './app/authorization.js';
import { IContext, ILanguage, ILanguageWord, IUser, IUserLanguage, IUserWord } from './types/index.js';
import translateText from './app/translateText.js';
import getNormalizedWord from './app/getNormalizedWord.js';

interface IUserCredentials {
  name: string;
  password: string;
}

interface IUserResponse extends Omit<IUser, 'languages'> {
  languages: ILanguage[];
}

interface IUserWordEdge extends Omit<IUserWord, 'id'>, ILanguageWord {}

interface IUserWordsResponse {
  edges: IUserWordEdge[];
  pageInfo: {
    totalCount: number;
    hasNextPage: boolean;
  };
}

export const root = {
  createUser: async ({ name, password }: IUserCredentials, context: IContext): Promise<string> => {
    const existingUser = context.db.users.find(user => user.name === name);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser: IUser = { id: String(context.db.users.length + 1), name, passwordHash, salt, languages: [] };

    context.db.users.push(newUser);

    return generateToken(newUser);
  },
  login: async ({ name, password }: IUserCredentials, context: IContext): Promise<string> => {
    const user = context.db.users.find(u => u.name === name);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return generateToken(user);
  },
  user: async (_: never, context: IContext): Promise<IUserResponse | undefined> => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);
    const languages = user?.languages?.map((language: IUserLanguage) =>
      context.db.languages.find(({ id }) => id === language.id),
    );

    if (!user) {
      throw new Error('User not found');
    }

    return { ...user, languages };
  },
  languages: async (_: never, context: IContext): Promise<ILanguage[]> => {
    return context.db.languages;
  },
  userWords: async (
    { languageId, perPage, page }: { languageId: string; perPage: number; page: number },
    context: IContext,
  ): Promise<IUserWordsResponse> => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userWords = user.languages.find((language: IUserLanguage) => language.id === languageId)?.words || [];
    const languageWords = context.db.languages.find((language: ILanguage) => language.id === languageId)?.words || [];

    const endIndex = page * perPage;
    const startIndex = endIndex - perPage;

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
  },
  addWordsFromTranslation: async (
    { languageId, translations }: { languageId: string; translations: string[] },
    context: IContext,
  ) => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);

    if (!user) {
      throw new Error('User not found');
    }

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
      return { id: uuidv4(), word, translation: translationsToCreate[id] };
    });

    const userWords = [...languageWords, ...languageWordsNew]
      .filter((languageWord: ILanguageWord) => {
        return !userLanguage.words.find((userWord: IUserWord) => userWord.id === languageWord.id);
      })
      .map((languageWord: ILanguageWord) => {
        return { id: languageWord.id, lastUse: 0 };
      });

    userLanguage.words = [...userLanguage.words, ...userWords];
    language.words = [...language.words, ...languageWordsNew];

    return true;
  },
  updateWords: async ({ languageId, words }: { languageId: string; words: IUserWord[] }, context: IContext) => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);

    if (!user) {
      throw new Error('User not found');
    }

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
  },
  removeWords: async ({ languageId, wordIds }: { languageId: string; wordIds: string[] }, context: IContext) => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userLanguage = user.languages.find((language: IUserLanguage) => language.id === languageId);

    if (userLanguage) {
      userLanguage.words = userLanguage.words.filter(({ id }: IUserWord) => !wordIds.includes(id));
    }

    return true;
  },
};

export const schema = buildSchema(`
  interface Node {
    id: ID!
  }

  type Language implements Node {
    id: ID!
    name: String!
    code: String!
    translationCode: String!
  }

  type User implements Node {
    id: ID!
    name: String!
    languages: [Language]!
  }
  
  type UserWord implements Node {
    id: ID!
    word: String!
    translation: String!
    lastUse: Float
  }
  
  type PageInfo {
    totalCount: Int!
    hasNextPage: Boolean!
  }
  
  type UserWordResponse {
    edges: [UserWord]!
    pageInfo: PageInfo!
  }
  
  input UserWordInput {
    id: ID!
    lastUse: Float!
  }
  
  type Query {
    user: User
    languages: [Language]!
    userWords(languageId: ID!, perPage: Int!, page: Int!): UserWordResponse!
  }

  type Mutation {
    createUser(name: String!, password: String!): String
    login(name: String!, password: String!): String
    addWordsFromTranslation(languageId: ID!, translations: [String]!): Boolean
    updateWords(languageId: ID!, words: [UserWordInput]!): Boolean
    removeWords(languageId: ID!, wordIds: [ID]!): Boolean
  }
`);
