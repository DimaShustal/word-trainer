import { get, makeAutoObservable, reaction } from 'mobx';
import { IWord } from 'types/Word';
import Word from './Word';
import AppStore from './AppStore';

class WordList {
  words: IWord[] = [];
  isLoaded: boolean = false;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
    reaction(
      () => get(this.store.user, 'language'),
      language => {
        if (language && this.isLoaded) {
          this.words = [];
          this.isLoaded = false;
        }
      },
    );
  }

  setWords(data: IWord[]) {
    this.words = data.map(word => new Word(this.store, word));
    this.isLoaded = true;
  }

  async fetchWords() {
    try {
      const res = await fetch(`/data/${get(this.store.user, 'language')}_words.json`).then(res => res.json());

      if (res?.status === 200 && res?.data) {
        this.setWords(res?.data);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default WordList;
