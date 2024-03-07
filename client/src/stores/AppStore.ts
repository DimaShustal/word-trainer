import WordList from './WordList/WordList';
import User from './User/User';
import Languages from './Languages/Languages';
import Alerts from './Alerts/Alerts';

export default class AppStore {
  user = new User(this);
  wordList = new WordList(this);
  languages = new Languages(this);
  alerts = new Alerts(this);
}
