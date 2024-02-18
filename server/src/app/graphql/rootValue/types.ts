import { ILanguage, ILanguageWord, IUser, IUserWord } from '../../../types/index.js';

export interface IUserCredentials {
  name: string;
  password: string;
}

export interface IUserResponse extends Omit<IUser, 'languages'> {
  languages: ILanguage[];
}

export interface IUserWordEdge extends Omit<IUserWord, 'id'>, ILanguageWord {}

export interface IUserWordsResponse {
  edges: IUserWordEdge[];
  pageInfo: {
    totalCount: number;
    hasNextPage: boolean;
  };
}
