import { ApolloError } from '@apollo/client';

function normalizeYupError(error: any) {
  // @ts-ignore
  if (error instanceof ApolloError && error.networkError?.statusCode === 429) {
    return ['Try later'];
  }

  if (error instanceof ApolloError && error.graphQLErrors?.length > 0) {
    return error.graphQLErrors.map(({ message }) => message);
  }

  return null;
}

export default normalizeYupError;
