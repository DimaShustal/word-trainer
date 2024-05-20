import createUser from './handlers/createUser.js';
import login from './handlers/login.js';
import user from './handlers/user.js';
import languages from './handlers/languages.js';
import userWords from './handlers/userWords.js';
import addWordsFromTranslation from './handlers/addWordsFromTranslation.js';
import updateWords from './handlers/updateWords.js';
import removeWords from './handlers/removeWords.js';
import withTimeout from '../../functions/withTimeout.js';

const rootValue = {
  createUser: withTimeout(createUser),
  login: withTimeout(login),
  user: withTimeout(user),
  languages: withTimeout(languages),
  userWords: withTimeout(userWords),
  addWordsFromTranslation: withTimeout(addWordsFromTranslation),
  updateWords: withTimeout(updateWords),
  removeWords: withTimeout(removeWords),
};

export default rootValue;
