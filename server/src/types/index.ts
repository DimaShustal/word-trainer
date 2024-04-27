import mongoose from 'mongoose';

export interface ILanguage {
  id: mongoose.Types.ObjectId;
  name: string;
  code: string;
  translationCode: string;
}

export interface IWord {
  id: mongoose.Types.ObjectId;
  languageId: mongoose.Types.ObjectId;
  word: string;
  translation: string;
}

export interface IUserWord {
  id: mongoose.Types.ObjectId;
  wordId: mongoose.Types.ObjectId;
  languageId: mongoose.Types.ObjectId;
  lastUse: Date;
  createdAt: Date;
  word: string;
  translation: string;
}

export interface IUser {
  id: mongoose.Types.ObjectId;
  name: string;
  passwordHash: string;
  salt: string;
  words: IUserWord[];
}

export interface IJwtData {
  name: string;
  userId: string;
}

export interface IContext {
  user?: IJwtData;
}

export interface IUserCredentials {
  name: string;
  password: string;
}
