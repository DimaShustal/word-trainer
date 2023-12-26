import { makeAutoObservable } from 'mobx';
import { IWord } from 'types/Word';
import { Word } from './Word';
import AppStore from './AppStore';

class WordList {
  language: string | undefined = 'EN';
  words: IWord[] = [];
  isLoaded: boolean = false;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }

  setWords(data: IWord[]) {
    this.words = data.map(word => new Word(this.store, word));
    this.isLoaded = true;
  }

  setLanguage(language: string) {
    if (language !== this.language) {
      this.words = [];
      this.isLoaded = false;
    }

    this.language = language;
  }

  async fetchWords() {
    try {
      const res = await fetch(`/data/${this.language}_words.json`).then(res => res.json());

      if (res?.status === 200 && res?.data) {
        this.setWords(res?.data);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default WordList;
