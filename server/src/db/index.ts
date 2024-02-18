import { ILanguage, IUser } from '../types/index.js';

const usersDb: IUser[] = [
  {
    id: '1',
    name: 'test1',
    passwordHash: '$2b$10$wg6HoT8yVxQP5YdurhL5.uLi6/Pfm9HsnNX0p8.Wmr6ZE/SXKjZ2i',
    salt: '$2b$10$wg6HoT8yVxQP5YdurhL5.u',
    languages: [
      {
        id: '1',
        words: [
          { id: '1', lastUse: 1702412328185 },
          { id: '2', lastUse: 1702412338185 },
        ],
      },
      {
        id: '2',
        words: [
          { id: '1', lastUse: 1702412328185 },
          { id: '2', lastUse: 1702412338185 },
          { id: '3', lastUse: 1702412348185 },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'test3',
    passwordHash: '$2b$10$naQhvIujs4kVSSTs7grxduAB14wIqu0qqmeR3KG9VFcvXc1UjTbQO',
    salt: '$2b$10$naQhvIujs4kVSSTs7grxdu',
    languages: [],
  },
];

const languagesDb: ILanguage[] = [
  {
    id: '1',
    name: 'English',
    code: 'en',
    translationCode: 'ru',
    words: [
      { word: 'violently', translation: 'яростно', id: '1' },
      { word: 'suffering from', translation: 'страдать от', id: '2' },
      { word: 'passed out', translation: 'потерял сознание', id: '3' },
      { word: 'grief', translation: 'горе', id: '4' },
      { word: 'unbearable', translation: 'невыносимый', id: '5' },
    ],
  },
  {
    id: '2',
    name: 'Polish',
    code: 'pl',
    translationCode: 'ru',
    words: [
      { word: 'Jak się masz?', translation: 'Как дела?', id: '1' },
      { word: 'Ile to kosztuje?', translation: 'Сколько это стоит?', id: '2' },
      {
        word: 'Jestem z firmy OTS i zapomniałem karty, czy możesz mi pomóc?',
        translation: 'Я из компании ОТС и я забыл карту, не могли бы вы помочь мне подняться?',
        id: '3',
      },
    ],
  },
];

const db = {
  users: usersDb,
  languages: languagesDb,
};

export default db;
