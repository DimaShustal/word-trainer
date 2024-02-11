import { buildSchema } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JwtData } from './app/authorization.js';

interface User {
  id: string;
  name: string;
  passwordHash: string;
  salt: string;
}

interface Context {
  user?: JwtData;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const usersDb: User[] = [
  {
    id: '1',
    name: 'test1',
    passwordHash: '$2b$10$wg6HoT8yVxQP5YdurhL5.uLi6/Pfm9HsnNX0p8.Wmr6ZE/SXKjZ2i',
    salt: '$2b$10$wg6HoT8yVxQP5YdurhL5.u',
  },
  {
    id: '2',
    name: 'test3',
    passwordHash: '$2b$10$naQhvIujs4kVSSTs7grxduAB14wIqu0qqmeR3KG9VFcvXc1UjTbQO',
    salt: '$2b$10$naQhvIujs4kVSSTs7grxdu',
  },
];

const generateToken = (user: User): string => {
  return jwt.sign({ name: user.name, userId: user.id }, JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
};

export const root = {
  createUser: async ({ name, password }: { name: string; password: string }): Promise<string> => {
    const existingUser = usersDb.find(user => user.name === name);

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = { id: String(usersDb.length + 1), name, passwordHash, salt };

    usersDb.push(newUser);

    return generateToken(newUser);
  },
  login: async ({ name, password }: { name: string; password: string }): Promise<string> => {
    const user = usersDb.find(u => u.name === name);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return generateToken(user);
  },
  user: async (_: never, context: Context): Promise<User | undefined> => {
    if (!context?.user?.userId) {
      throw new Error('User not found');
    }

    const user = usersDb.find(u => u.id === context?.user?.userId);

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
