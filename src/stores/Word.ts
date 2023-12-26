import { makeAutoObservable } from 'mobx';
import { IWord } from 'types/Word';
import AppStore from './AppStore';

export class Word implements IWord {
  word;
  translation;
  id;
  last_use;
  category;
  learned;

  constructor(private store: AppStore, word: IWord) {
    makeAutoObservable(this);

    this.word = word.word;
    this.translation = word.translation;
    this.id = word.id;
    this.last_use = word.last_use;
    this.category = word.category;
    this.learned = word.learned;
  }

  toggleLearned() {
    this.learned = !this.learned;
    // TODO - update word in database
  }
}
