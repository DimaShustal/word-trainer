import { makeAutoObservable } from 'mobx';
import { ICheckedPhrasePart, IPhrasePart, IWord } from 'types/Word';
import AppStore from '../AppStore';
import { UserWord } from '../../__generated__/graphql';
import { DAY_IN_MILLISECONDS } from '../../constants/time';
import WordApi from './WordApi';

const END_TIME_OF_LEARNED_STATUS = DAY_IN_MILLISECONDS * 10;

class Word implements IWord {
  id;
  lastUse;
  translation;
  word;
  learned;
  isPhrase;

  constructor(private store: AppStore, word: UserWord) {
    makeAutoObservable(this);

    this.id = word.id;
    this.lastUse = word.lastUse;
    this.translation = word.translation;
    this.word = word.word;
    this.learned = word.lastUse && Date.now() - word.lastUse < END_TIME_OF_LEARNED_STATUS;
    this.isPhrase = this.word.split(' ').length > 1 && this.translation.split(' ').length > 1;
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

  checkPhraseParts = (phraseParts: IPhrasePart[]) => {
    return phraseParts.reduce((result: ICheckedPhrasePart[], phrasePart: IPhrasePart, id) => {
      return [...result, { ...phrasePart, hasError: phrasePart.text !== this.phraseParts?.[id].text }];
    }, []);
  };

  updateLastUse = () => {
    this.lastUse = Date.now();

    if (this.store.user.currentLanguageId) {
      WordApi.updateWords(this.store.user.currentLanguageId, [{ id: this.id, lastUse: this.lastUse }]);
    }
  };
}

export default Word;
