import { ApolloError } from '@apollo/client';

function normalizeYupError(error: any) {
  if (error instanceof ApolloError && error.graphQLErrors?.length > 0) {
    return error.graphQLErrors.map(({ message }) => message);
  }

  return null;
}

export default normalizeYupError;
