export interface IUser {
  id: string;
  name: string;
  passwordHash: string;
  salt: string;
  languages: IUserLanguage[];
}

export interface IUserLanguage {
  id: string;
  words: IUserWord[];
}

export interface IUserWord {
  id: string;
  lastUse?: number;
}
