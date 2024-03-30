import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import { ApolloPersistOptions } from 'apollo3-cache-persist/lib/types';
import { LOCAL_STORAGE_KEYS } from '../constants/storage';
import { HOUR_IN_MILLISECONDS } from '../constants/time';
import { onError } from '@apollo/client/link/error';
import { POST_MESSAGE } from '../constants/message';
import { QueryUserWordsArgs, UserWordResponse } from '../__generated__/graphql';

let CLIENT: ApolloClient<any>;
let PERSISTOR: CachePersistor<any>;
let INIT_API_PROMISE: Promise<void>;

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
            keyFields: false,

            merge(existing: UserWordResponse, incoming: UserWordResponse, options) {
              const args = options.args as QueryUserWordsArgs;
              const start = args.offset;
              // end should not be more than totalCount and not less than 0
              const end = Math.max(Math.min(args.offset + args.limit, incoming.pageInfo.totalCount), 0);
              let edges = existing?.[args.languageId]?.edges ? existing[args.languageId].edges.slice(0, end) : [];

              for (let i = start; i < end; i += 1) {
                edges[i] = incoming.edges[i - start];
              }

              edges = edges.filter(edge => !!edge);

              return {
                ...existing,
                [args.languageId]: {
                  edges,
                  pageInfo: {
                    ...incoming.pageInfo,
                  },
                },
              };
            },

            read(existing: UserWordResponse, options) {
              const args = options.args as QueryUserWordsArgs;

              if (!existing?.[args.languageId]?.edges?.length) return undefined;

              const start = args.offset;
              const end = args.offset + args.limit;
              const edges = existing[args.languageId].edges.slice(start, end);

              if (!edges.length) return undefined;

              return {
                edges,
                pageInfo: {
                  hasNextPage: end < existing[args.languageId].pageInfo.totalCount,
                  totalCount: existing[args.languageId].pageInfo.totalCount,
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
