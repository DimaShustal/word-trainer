import { buildSchema } from 'graphql';
import bcrypt from 'bcrypt';
import { generateToken } from './app/authorization.js';
import { IContext, ILanguage, ILanguageWord, IUser, IUserLanguage, IUserWord } from './types/index.js';

interface IUserCredentials {
  name: string;
  password: string;
}

interface IUserResponse extends Omit<IUser, 'languages'> {
  languages: ILanguage[];
}

interface IUserWordsEdges extends Omit<IUserWord, 'id'>, ILanguageWord {}

interface IUserWordsResponse {
  edges: IUserWordsEdges[];
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
};

export const schema = buildSchema(`
  type Language {
    id: ID!
    name: String!
    code: String!
  }

  type User {
    id: ID!
    name: String!
    languages: [Language]!
  }
  
  type UserWord {
    id: ID!
    word: String!
    translation: String!
    lastUse: Float!
  }
  
  type PageInfo {
    totalCount: Int!
    hasNextPage: Boolean!
  }
  
  type UserWordResponse {
    edges: [UserWord]!
    pageInfo: PageInfo!
  }
  
  type Query {
    user: User
    languages: [Language]!
    userWords(languageId: ID!, perPage: Int!, page: Int!): UserWordResponse!
  }

  type Mutation {
    createUser(name: String!, password: String!): String
    login(name: String!, password: String!): String
  }
`);
