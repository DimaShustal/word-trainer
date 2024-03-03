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
  {
    id: '4',
    name: 'test@test.test',
    passwordHash: '$2b$10$XPGEJ8hn.M3x0KDQUbHQReb.boqerAlfxg1nG1daW9LITFBjPPRMS',
    salt: '$2b$10$XPGEJ8hn.M3x0KDQUbHQRe',
    languages: [
      {
        id: '2',
        words: [
          { id: '1', lastUse: 1702412328185 },
          { id: '2', lastUse: 1702412338185 },
          { id: '3', lastUse: 1702412348185 },
          { id: '4', lastUse: 1702412348185 },
          { id: '5', lastUse: 1702412348185 },
          { id: '6', lastUse: 1702412348185 },
          { id: '7', lastUse: 1702412348185 },
          { id: '8', lastUse: 1702412348185 },
          { id: '9', lastUse: 1702412348185 },
          { id: '10', lastUse: 1702412348185 },
          { id: '11', lastUse: 1702412348185 },
          { id: '12', lastUse: 1702412348185 },
          { id: '13', lastUse: 1702412348185 },
          { id: '14', lastUse: 1702412348185 },
          { id: '15', lastUse: 1702412348185 },
        ],
      },
    ],
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
      { word: 'jak się masz?', translation: 'как дела?', id: '1' },
      { word: 'ile to kosztuje?', translation: 'сколько это стоит?', id: '2' },
      {
        word: 'jestem z firmy ots, ale zapomniałem karty. czy mógłbyś mi pomóc?',
        translation: 'я из компании ОТС, но я забыл карту. могли бы вы помочь мне подняться?',
        id: '3',
      },
      {
        word: 'potrzebuję tego do ubiegania się o nową kartę pobytu.',
        translation: 'мне это нужно для подачи документов на новую карту побыта.',
        id: '4',
      },
      { word: 'uwielbiam jeździć na rolkach.', translation: 'я любою кататься на роликах.', id: '5' },
      { word: 'czy mogę w tym miejscu zasadzić drzewo?', translation: 'могу я посадить дерево в этом месте?', id: '6' },
      { word: 'lubię twojego psa.', translation: 'мне нравится ваша собака.', id: '7' },
      { word: 'ile lat ma twój pies?', translation: 'сколько лет твоей собаке?', id: '8' },
      { word: 'czy możesz zważyć mniejszy kawałek?', translation: 'можете взвесить кусок поменьше?', id: '9' },
      { word: 'czy możesz zważyć większy kawałek?', translation: 'можете взвесить кусок побольше?', id: '10' },
      {
        word: 'czy to normalna pogoda jak na tę porę roku?',
        translation: 'это нормальная погода для этой поры года?',
        id: '11',
      },
      { word: 'czy lubisz deszcz?', translation: 'вам нравится дождь?', id: '12' },
      { word: 'lubię deszcz.', translation: 'мне нравится дождь.', id: '13' },
      { word: 'lubię gotować.', translation: 'я люблю готовить.', id: '14' },
      { word: 'co to jest pepperoni?', translation: 'что такое пеперони?', id: '15' },
    ],
  },
];

const db = {
  users: usersDb,
  languages: languagesDb,
};

export default db;
