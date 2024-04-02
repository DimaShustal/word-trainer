import { IUserWord } from '../../../db/types.js';

export interface IUserCredentials {
  name: string;
  password: string;
}

export interface IUserWordsResponse {
  edges: IUserWord[];
  pageInfo: {
    totalCount: number;
    hasNextPage: boolean;
  };
}
