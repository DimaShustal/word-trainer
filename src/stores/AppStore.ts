import WordList from './WordList';
import User from './User';

export default class AppStore {
  user = new User(this);
  wordList = new WordList(this);
}
