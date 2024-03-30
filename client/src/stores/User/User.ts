import { makeAutoObservable } from 'mobx';
import AppStore from '../AppStore';
import api from '../../functions/api';
import { LOCAL_STORAGE_KEYS } from '../../constants/storage';
import { ROOT_PATH } from '../../constants/path';
import UserApi from './UserApi';
import { ApolloError } from '@apollo/client';
import normalizeYupError from '../../functions/normalizeGraphqlError';
import { User as UserGraphql } from '../../__generated__/graphql';

class User {
  currentLanguageId: string | undefined;
  isLoaded: boolean = false;
  isLoading: boolean = false;
  isLogged: boolean | undefined;

  id: UserGraphql['id'] | undefined;
  name: UserGraphql['name'] | undefined;
  languages: UserGraphql['languages'] | undefined;

  constructor(private store: AppStore) {
    makeAutoObservable(this);

    this.isLogged = !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  setLanguage = (languageId: string): void => {
    this.currentLanguageId = languageId;
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_LANGUAGE_ID, languageId);
  };

  fetchUser = async (): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;

    try {
      const data = await UserApi.fetchUser();

      if (data) {
        this.id = data.id;
        this.name = data.name;
        this.languages = data.languages;

        this.currentLanguageId =
          localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_LANGUAGE_ID) || data.languages?.[0]?.id;
        this.isLoaded = true;
        this.isLogged = true;
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('User.fetchUser', error);
      }
    }

    this.isLoading = false;
  };

  logout = async (): Promise<void> => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_LANGUAGE_ID);
    await api.clearCache();
    window.location.href = ROOT_PATH;
  };

  login = async (name: string, password: string): Promise<boolean> => {
    try {
      const data = await UserApi.login(name, password);

      if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data);
        await this.fetchUser();
      }

      return !!data;
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('User.login', error);
      }

      return false;
    }
  };

  createUser = async (name: string, password: string): Promise<boolean> => {
    try {
      const data = await UserApi.createUser(name, password);

      if (data) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data);
        await this.fetchUser();
      }

      return !!data;
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        errorMessages?.forEach(message => {
          this.store.alerts.showAlert({ message, type: 'error' });
        });
      } else {
        console.error('User.createUser', error);
      }

      return false;
    }
  };
}

export default User;
