import { buildSchema } from 'graphql';
import bcrypt from 'bcrypt';
import { generateToken } from './app/authorization.js';
import { IContext, IUser } from './types/index.js';

interface IUserCredentials {
  name: string;
  password: string;
}

export const root = {
  createUser: async ({ name, password }: IUserCredentials, context: IContext): Promise<string> => {
    const existingUser = context.db.users.find(user => user.name === name);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: IUser = { id: String(context.db.users.length + 1), name, passwordHash, salt };

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
  user: async (_: never, context: IContext): Promise<IUser | undefined> => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = context.db.users.find(u => u.id === context?.user?.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};

export const schema = buildSchema(`
  type User {
    id: ID
    name: String
  }
  
  type Query {
    user: User
  }

  type Mutation {
    createUser(name: String!, password: String!): String
    login(name: String!, password: String!): String
  }
`);
