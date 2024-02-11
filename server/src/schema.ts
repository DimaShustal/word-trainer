import express from 'express';
import { buildSchema } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface User {
  id: number;
  name: string;
  passwordHash: string;
  salt: string;
}

interface Context {
  req: express.Request;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const usersDb: User[] = [
  {
    id: 1,
    name: 'test1',
    passwordHash: '$2b$10$wg6HoT8yVxQP5YdurhL5.uLi6/Pfm9HsnNX0p8.Wmr6ZE/SXKjZ2i',
    salt: '$2b$10$wg6HoT8yVxQP5YdurhL5.u',
  },
  {
    id: 2,
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

    const newUser: User = { id: usersDb.length + 1, name, passwordHash, salt };

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
    const { req } = context;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('User not found');
    }

    const [prefix, token] = authorizationHeader.split(' ');

    if (!token || (prefix && prefix.toLowerCase() !== 'bearer')) {
      throw new Error('User not found');
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { name: string; userId: number };
    const user = usersDb.find(u => u.id === decoded.userId);

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
