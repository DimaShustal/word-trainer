import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import { ApolloPersistOptions } from 'apollo3-cache-persist/lib/types';
import { LOCAL_STORAGE_KEYS } from '../constants/storage';
import { HOUR_IN_MILLISECONDS } from '../constants/time';
import { onError } from '@apollo/client/link/error';
import { POST_MESSAGE } from '../constants/message';
import { QueryUserWordsArgs, UserWordResponse } from '../__generated__/graphql';

let CLIENT;
let PERSISTOR;
let INIT_API_PROMISE;

function isCacheUpToDate() {
  const cacheLastUse = localStorage.getItem(LOCAL_STORAGE_KEYS.CACHE_LAST_USE);

  if (!cacheLastUse || !Number(cacheLastUse) || Date.now() - Number(cacheLastUse) > HOUR_IN_MILLISECONDS) {
    return false;
  }

  return true;
}

function setCacheLastUse() {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CACHE_LAST_USE, String(Date.now()));
}

async function initApi() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          userWords: {
            keyFields: ['languageId'],

            merge(existing: UserWordResponse, incoming: UserWordResponse, options) {
              const args = options.args as QueryUserWordsArgs;
              let edges = existing?.edges ? existing.edges.slice(0) : [];
              const start = (args.page - 1) * args.perPage;
              const end = Math.min(args.page * args.perPage, incoming.pageInfo.totalCount);

              for (let i = start; i < end; i += 1) {
                edges[i] = incoming.edges[i - start];
              }

              edges = edges.filter(edge => !!edge);

              return {
                edges,
                pageInfo: {
                  hasNextPage: true,
                  totalCount: incoming.pageInfo.totalCount,
                },
              };
            },

            read(existing: UserWordResponse, options) {
              if (!existing?.edges?.length) return undefined;

              const args = options.args as QueryUserWordsArgs;
              const start = (args.page - 1) * args.perPage;
              const end = args.page * args.perPage;
              const edges = existing.edges.slice(start, end);

              if (!edges.length) return undefined;

              return {
                edges,
                pageInfo: {
                  hasNextPage: end < existing.pageInfo.totalCount,
                  totalCount: existing.pageInfo.totalCount,
                },
              };
            },
          },
        },
      },
    },
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const logoutLink = onError(({ response }) => {
    const unauthorized = response?.errors?.some(({ message }) => message === 'User not found');

    if (unauthorized) {
      window.postMessage({ type: POST_MESSAGE.LOGOUT }, '*');
    }
  });

  PERSISTOR = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  } as ApolloPersistOptions<string>);

  if (isCacheUpToDate()) {
    await PERSISTOR.restore();
  } else {
    await PERSISTOR.purge();
  }

  setCacheLastUse();

  CLIENT = new ApolloClient({
    link: authLink.concat(logoutLink).concat(httpLink),
    cache,
    name: 'web-client',
    version: process.env.REACT_APP_VERSION,
  });
}

async function getClient() {
  if (CLIENT) {
    return CLIENT;
  }

  if (!INIT_API_PROMISE) {
    INIT_API_PROMISE = initApi();
  }

  await INIT_API_PROMISE;

  return CLIENT;
}

async function clearCache() {
  if (!CLIENT || !PERSISTOR) {
    await getClient();
  }

  await PERSISTOR.purge();
  await CLIENT.clearStore();
  localStorage.removeItem(LOCAL_STORAGE_KEYS.CACHE_LAST_USE);
}

const api = {
  getClient,
  clearCache,
};

export default api;
