import { get, makeAutoObservable, reaction } from 'mobx';
import { IWord, IWordData } from 'types/Word';
import Word from '../Word/Word';
import AppStore from '../AppStore';
import random from '../../functions/random';

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

  setWords(data: IWordData[]) {
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

  get notLearnedWords() {
    return this.words.filter(({ learned }) => !learned);
  }

  get phrases() {
    return this.words.filter(({ isPhrase }) => isPhrase);
  }

  get notLearnedPhrase() {
    return this.words.filter(({ learned, isPhrase }) => !learned && isPhrase);
  }

  getRandomPhrase() {
    if (!this.phrases.length) {
      return null;
    }

    if (this.notLearnedPhrase.length) {
      const randomIndex = random(0, this.notLearnedPhrase.length - 1);

      return this.notLearnedPhrase[randomIndex];
    }

    const randomIndex = random(0, this.phrases.length - 1);

    return this.phrases[randomIndex];
  }

  getRandomWord() {
    if (!this.words.length) {
      return null;
    }

    if (this.notLearnedWords.length) {
      const randomIndex = random(0, this.notLearnedWords.length - 1);

      return this.notLearnedWords[randomIndex];
    }

    const randomIndex = random(0, this.words.length - 1);

    return this.words[randomIndex];
  }
}

export default WordList;
