import { makeAutoObservable } from 'mobx';
import AppStore from '../AppStore';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import api from '../../functions/api';
import { LOCAL_STORAGE_KEYS } from '../../constants/storage';
import { ROOT_PATH } from '../../constants/path';
import UserApi from './UserApi';
import { ApolloError } from '@apollo/client';
import normalizeYupError from '../../functions/normalizeGraphqlError';
import { User as UserGraphql } from '../../__generated__/graphql';

class User {
  language: string | undefined;
  isLoaded: boolean = false;
  isLogged: boolean | undefined;

  id: UserGraphql['id'] | undefined;
  name: UserGraphql['name'] | undefined;
  languages: UserGraphql['languages'] | undefined;

  constructor(private store: AppStore) {
    makeAutoObservable(this);

    this.isLogged = !!localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  }

  setLanguage = (language: string): void => {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      this.language = language;
      localStorage.setItem('language', language);
    }
  };

  fetchUser = async (): Promise<void> => {
    try {
      const data = await UserApi.fetchUser();

      if (data) {
        this.id = data.id;
        this.name = data.name;
        this.languages = data.languages;

        this.language = localStorage.getItem('language') || 'EN';
        this.isLoaded = true;
        this.isLogged = true;
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessages = normalizeYupError(error);

        // TODO add alerts
        errorMessages?.forEach(message => {
          alert(message);
        });
      } else {
        console.error('User.fetchUser', error);
      }
    }
  };

  logout = async (): Promise<void> => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    await api.clearCache();
    window.location.href = ROOT_PATH;
  };

  login = async (name, password): Promise<boolean> => {
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

        // TODO add alerts
        errorMessages?.forEach(message => {
          alert(message);
        });
      } else {
        console.error('User.login', error);
      }

      return false;
    }
  };

  createUser = async (name, password): Promise<boolean> => {
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

        // TODO add alerts
        errorMessages?.forEach(message => {
          alert(message);
        });
      } else {
        console.error('User.createUser', error);
      }

      return false;
    }
  };
}

export default User;
