import { makeAutoObservable } from 'mobx';
import AppStore from '../AppStore';
import { ApolloError } from '@apollo/client';
import normalizeYupError from '../../functions/normalizeGraphqlError';
import LanguagesApi from './LanguagesApi';
import { Language as LanguageGraphql, Maybe } from '../../__generated__/graphql';

class Languages {
  list: Array<Maybe<LanguageGraphql>> | undefined;
  isLoaded: boolean = false;
  isLoading: boolean = false;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }

  fetchLanguages = async (): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      const data = await LanguagesApi.fetchLanguages();

      if (data) {
        this.list = data;
        this.isLoaded = true;
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('Languages.fetchLanguages', error);
      }
    }

    this.isLoading = false;
  };
}

export default Languages;
