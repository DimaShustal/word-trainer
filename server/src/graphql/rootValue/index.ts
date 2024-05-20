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
  createUser: withTimeout<typeof createUser>(createUser),
  login: withTimeout<typeof login>(login),
  user: withTimeout<typeof user>(user),
  languages: withTimeout<typeof languages>(languages),
  userWords: withTimeout<typeof userWords>(userWords),
  addWordsFromTranslation: withTimeout<typeof addWordsFromTranslation>(addWordsFromTranslation),
  updateWords: withTimeout<typeof updateWords>(updateWords),
  removeWords: withTimeout<typeof removeWords>(removeWords),
};

export default rootValue;
