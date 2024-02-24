import WordList from './WordList/WordList';
import User from './User/User';

export default class AppStore {
  user = new User(this);
  wordList = new WordList(this);
}
