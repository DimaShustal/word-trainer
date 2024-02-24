import { makeAutoObservable } from 'mobx';
import { ICheckedPhrasePart, IPhrasePart, IWord, IWordData } from 'types/Word';
import AppStore from '../AppStore';

class Word implements IWord {
  word;
  translation;
  id;
  last_use;
  category;
  learned;
  isPhrase;

  constructor(private store: AppStore, word: IWordData) {
    makeAutoObservable(this);

    this.word = word.word.trim();
    this.translation = word.translation.trim();
    this.id = word.id;
    this.last_use = word.last_use;
    this.category = word.category;
    this.learned = word.learned;

    this.isPhrase = this.word.split(' ').length > 1;
  }

  get phraseParts() {
    if (!this.isPhrase) {
      return null;
    }

    return this.word
      .toLowerCase()
      .replace(/[.,?!]+/gi, '')
      .replace(/\s+/gi, ' ')
      .split(' ')
      .map((text, id) => ({ text, id }));
  }

  checkPhraseParts(phraseParts: IPhrasePart[]) {
    return phraseParts.reduce((result: ICheckedPhrasePart[], phrasePart: IPhrasePart, id) => {
      return [...result, { ...phrasePart, hasError: phrasePart.text !== this.phraseParts?.[id].text }];
    }, []);
  }

  updateLastUse() {
    this.last_use = Date.now();
    // TODO - update word in database
  }
}

export default Word;
