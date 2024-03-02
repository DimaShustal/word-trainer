import { Query } from '../../__generated__/graphql';
import api from '../../functions/api';
import { gql } from '@apollo/client';

async function fetchLanguages(): Promise<Query['languages']> {
  const client = await api.getClient();
  const { data } = await client.query<Query>({
    query: gql`
      query {
        languages {
          id
          name
          code
        }
      }
    `,
  });

  return data?.languages as Query['languages'];
}

const LanguagesApi = {
  fetchLanguages,
};

export default LanguagesApi;
