export interface IJwtData {
  name: string;
  userId: string;
}

export interface IContext {
  user?: IJwtData;
}
