import { IUser, IUserLanguage, IUserWord } from './user';
import { ILanguageWord, ILanguage } from './language';

export { IUser, IUserLanguage, IUserWord, ILanguageWord, ILanguage };

export interface IJwtData {
  name: string;
  userId: string;
}

interface IDb {
  users: IUser[];
  languages: ILanguage[];
}

export interface IContext {
  user?: IJwtData;
  db: IDb;
}
