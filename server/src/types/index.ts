export interface IJwtData {
  name: string;
  userId: string;
}

interface IDb {
  users: IUser[];
}

export interface IUser {
  id: string;
  name: string;
  passwordHash: string;
  salt: string;
}

export interface IContext {
  user?: IJwtData;
  db: IDb;
}
