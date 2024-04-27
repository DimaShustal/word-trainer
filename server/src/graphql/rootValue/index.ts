import createUser from './handlers/createUser.js';
import login from './handlers/login.js';
import user from './handlers/user.js';
import languages from './handlers/languages.js';
import userWords from './handlers/userWords.js';
import addWordsFromTranslation from './handlers/addWordsFromTranslation.js';
import updateWords from './handlers/updateWords.js';
import removeWords from './handlers/removeWords.js';

const rootValue = {
  createUser,
  login,
  user,
  languages,
  userWords,
  addWordsFromTranslation,
  updateWords,
  removeWords,
};

export default rootValue;
