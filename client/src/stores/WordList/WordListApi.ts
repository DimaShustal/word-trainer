import api from '../../functions/api';
import { gql } from '@apollo/client';
import { Query } from '../../__generated__/graphql';

async function fetchUserWords(languageId: string, perPage: number, page: number): Promise<Query['userWords']> {
  const client = await api.getClient();
  const { data } = await client.query<Query>({
    query: gql`
      query UserWords($languageId: ID!, $perPage: Int!, $page: Int!) {
        userWords(languageId: $languageId, perPage: $perPage, page: $page) {
          edges {
            id
            word
            translation
            lastUse
          }
          pageInfo {
            totalCount
            hasNextPage
          }
        }
      }
    `,
    variables: {
      languageId,
      perPage,
      page,
    },
  });

  return data?.userWords as Query['userWords'];
}

const WordListApi = {
  fetchUserWords,
};

export default WordListApi;
