import WordList from './WordList/WordList';
import User from './User/User';
import Languages from './Languages/Languages';

export default class AppStore {
  user = new User(this);
  wordList = new WordList(this);
  languages = new Languages(this);
}
