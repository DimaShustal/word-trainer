import api from '../../functions/api';
import { gql } from '@apollo/client';
import { Mutation, Query } from '../../__generated__/graphql';

const UserWordsQuery = gql`
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
`;

async function fetchUserWords(languageId: string, perPage: number, page: number): Promise<Query['userWords']> {
  const client = await api.getClient();
  const { data } = await client.query<Query>({
    query: UserWordsQuery,
    variables: {
      languageId,
      perPage,
      page,
    },
  });

  return data?.userWords as Query['userWords'];
}

async function removeWords(languageId: string, wordIds: string[]): Promise<Mutation['removeWords']> {
  const client = await api.getClient();

  const { data } = await client.mutate<Mutation>({
    mutation: gql`
      mutation RemoveWords($languageId: ID!, $wordIds: [ID]!) {
        removeWords(languageId: $languageId, wordIds: $wordIds)
      }
    `,
    variables: {
      languageId,
      wordIds,
    },
  });

  if (data?.removeWords) {
    const cachedUserWords = client.readQuery({
      query: UserWordsQuery,
      variables: {
        languageId: languageId,
        page: 1,
        perPage: 1000,
      },
    });

    if (cachedUserWords) {
      const newData = {
        userWords: {
          ...cachedUserWords.userWords,
          edges: cachedUserWords.userWords.edges.filter(edge => !wordIds.includes(edge?.id)),
          pageInfo: {
            ...cachedUserWords.userWords.pageInfo,
            totalCount: cachedUserWords.userWords.pageInfo.totalCount - wordIds.length,
          },
        },
      };

      client.writeQuery({
        query: UserWordsQuery,
        variables: {
          languageId: languageId,
          page: 1,
          perPage: 1000,
        },
        data: newData,
      });
    }
  }

  return data?.removeWords as Mutation['removeWords'];
}

const WordListApi = {
  fetchUserWords,
  removeWords,
};

export default WordListApi;
