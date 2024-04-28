import { get, makeAutoObservable, reaction } from 'mobx';
import { IWord } from 'types/Word';
import Word from '../Word/Word';
import AppStore from '../AppStore';
import random from '../../functions/random';
import WordListApi from './WordListApi';
import { UserWord } from '../../__generated__/graphql';
import { ApolloError } from '@apollo/client';
import normalizeYupError from '../../functions/normalizeGraphqlError';

const PER_PAGE = 50;
const INITIAL_TOTAL_COUNT = 0;

class WordList {
  words: IWord[] = [];
  totalCount: number = INITIAL_TOTAL_COUNT;
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
          this.totalCount = INITIAL_TOTAL_COUNT;
          this.hasNextPage = false;
          this.isLoaded = false;
          this.isLoading = false;
        }
      },
    );
  }

  get notLearnedWords(): IWord[] {
    return this.words.filter(({ learned }) => !learned);
  }

  get phrases(): IWord[] {
    return this.words.filter(({ isPhrase }) => isPhrase);
  }

  get notLearnedPhrase(): IWord[] {
    return this.words.filter(({ learned, isPhrase }) => !learned && isPhrase);
  }

  addWords = (data: UserWord[]): void => {
    if (!data.length) return;

    this.words = [...this.words, ...data.map(word => new Word(this.store, word) as IWord)];
  };

  fetchWords = async (): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      const currentLanguageId = get(this.store.user, 'currentLanguageId');

      if (!currentLanguageId) {
        this.store.alerts.showAlert({ message: 'Выберите язык', type: 'error' });
        this.isLoading = false;
        return;
      }

      const data = await WordListApi.fetchUserWords(currentLanguageId, this.words.length, PER_PAGE);

      if (data?.edges?.length) {
        this.totalCount = data.pageInfo.totalCount;
        this.hasNextPage = data.pageInfo.hasNextPage;
        this.addWords(data.edges || []);
      }

      this.isLoaded = true;
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('WordList.fetchWords', error);
      }
    }

    this.isLoading = false;
  };

  getRandomPhrase = (): IWord | null => {
    if (!this.phrases.length) {
      return null;
    }

    if (this.notLearnedPhrase.length) {
      const randomIndex = random(0, this.notLearnedPhrase.length - 1);

      return this.notLearnedPhrase[randomIndex];
    }

    const randomIndex = random(0, this.phrases.length - 1);

    return this.phrases[randomIndex];
  };

  getRandomWord = (): IWord | null => {
    if (!this.words.length) {
      return null;
    }

    if (this.notLearnedWords.length) {
      const randomIndex = random(0, this.notLearnedWords.length - 1);

      return this.notLearnedWords[randomIndex];
    }

    const randomIndex = random(0, this.words.length - 1);

    return this.words[randomIndex];
  };

  removeWords = async (wordIds: string[]): Promise<void> => {
    try {
      const currentLanguageId = get(this.store.user, 'currentLanguageId');

      if (!this.words.length || !wordIds.length || !currentLanguageId) return;

      const success = await WordListApi.removeWords(currentLanguageId, wordIds, this.totalCount);

      if (!success) return;

      this.words = this.words.filter(word => !wordIds.includes(word.id));

      if (this.words.length === 0 && this.hasNextPage) {
        this.isLoaded = false;
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('WordList.removeWords', error);
      }
    }
  };

  addWordsFromTranslation = async (translation: string[]): Promise<void> => {
    try {
      const currentLanguageId = get(this.store.user, 'currentLanguageId');

      if (!translation.length || !currentLanguageId) return;

      const newWords = await WordListApi.addWordsFromTranslation(currentLanguageId, translation, this.totalCount);

      if (newWords?.length) {
        this.addWords(newWords as UserWord[]);
      }

      this.store.alerts.showAlert({ message: 'Слова успешно добавлены', type: 'success' });
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('WordList.addWordsFromTranslation', error);
      }
    }
  };
}

export default WordList;
