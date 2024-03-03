import { get, makeAutoObservable, reaction } from 'mobx';
import { IWord } from 'types/Word';
import Word from '../Word/Word';
import AppStore from '../AppStore';
import random from '../../functions/random';
import WordListApi from './WordListApi';
import { UserWord } from '../../__generated__/graphql';
import { ApolloError } from '@apollo/client';
import normalizeYupError from '../../functions/normalizeGraphqlError';

const PER_PAGE = 3;
const INITIAL_PAGE = 1;

class WordList {
  words: IWord[] = [];
  page: number = INITIAL_PAGE;
  hasNextPage: boolean = false;
  isLoaded: boolean = false;
  isLoading: boolean = false;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
    reaction(
      () => get(this.store.user, 'currentLanguageId'),
      currentLanguageId => {
        if (currentLanguageId && this.isLoaded) {
          this.words = [];
          this.page = INITIAL_PAGE;
          this.hasNextPage = false;
          this.isLoaded = false;
          this.isLoading = false;
        }
      },
    );
  }

  addWords(data: UserWord[]) {
    if (!data.length) return;

    this.words = [...this.words, ...data.map(word => new Word(this.store, word))];
  }

  async fetchWords(): Promise<void> {
    this.isLoading = true;

    try {
      const currentLanguageId = get(this.store.user, 'currentLanguageId');

      if (!currentLanguageId) {
        // TODO add alerts
        alert('Please select a language.');
        return;
      }

      const data = await WordListApi.fetchUserWords(currentLanguageId, PER_PAGE, this.page);

      if (data?.edges?.length) {
        this.page += 1;
        this.hasNextPage = data.pageInfo.hasNextPage;
        this.addWords(data.edges || []);
      }

      this.isLoaded = true;
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        // TODO add alerts
        errorMessages?.forEach(message => {
          alert(message);
        });
      } else {
        console.error('WordList.fetchWords', error);
      }
    }

    this.isLoading = false;
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
