// @ts-nocheck

import createUser from './handlers/createUser.js';
import login from './handlers/login.js';
import user from './handlers/user.js';
import languages from './handlers/languages.js';
import userWords from './handlers/userWords.js';
import addWordsFromTranslation from './handlers/addWordsFromTranslation.js';
import updateWords from './handlers/updateWords.js';
import removeWords from './handlers/removeWords.js';
import { SECOND_IN_MILLISECONDS } from '../../constants/time.js';

const requestTimeout = async () => {
  await new Promise(resolve => setTimeout(resolve, SECOND_IN_MILLISECONDS));

  return new Error('Try later');
};

const rootValue = {
  createUser,
  login: (...args) => {
    return Promise.race([login(...args), requestTimeout()]);
  },
  user,
  languages,
  userWords,
  addWordsFromTranslation,
  updateWords,
  removeWords,
};

export default rootValue;
