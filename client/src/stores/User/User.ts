import { makeAutoObservable } from 'mobx';
import AppStore from '../AppStore';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

class User {
  language: string | undefined;
  isLoaded: boolean = false;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }

  setLanguage(language: string) {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      this.language = language;
      localStorage.setItem('language', language);
    }
  }

  async fetchUser() {
    // TODO - fetch user from database
    await new Promise(resolve => setTimeout(resolve, 0));
    this.language = localStorage.getItem('language') || 'EN';
    this.isLoaded = true;
  }
}

export default User;
