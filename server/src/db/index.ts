import { IUser } from '../types/index.js';

const usersDb: IUser[] = [
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

const db = {
  users: usersDb,
};

export default db;
