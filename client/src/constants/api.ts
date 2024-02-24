import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// TODO (graphql) add 401 handler: https://www.apollographql.com/docs/react/networking/advanced-http-networking#customizing-response-logic
// TODO (graphql) clear cache on logout: https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
// TODO (graphql) store cache in localStorage: https://www.apollographql.com/docs/react/caching/advanced-topics#persisting-the-cache

const api = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: 'web-client',
  version: process.env.REACT_APP_VERSION,
});

export default api;
