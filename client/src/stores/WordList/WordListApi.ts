import api from '../../functions/api';
import { gql } from '@apollo/client';
import { Mutation, Query } from '../../__generated__/graphql';

const UserWordsQuery = gql`
  query UserWords($languageId: ID!, $offset: Int!, $limit: Int!) {
    userWords(languageId: $languageId, offset: $offset, limit: $limit) {
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

async function fetchUserWords(languageId: string, offset: number, limit: number): Promise<Query['userWords']> {
  const client = await api.getClient();
  const { data } = await client.query<Query>({
    query: UserWordsQuery,
    variables: {
      languageId,
      offset,
      limit,
    },
  });

  return data?.userWords as Query['userWords'];
}

async function removeWords(
  languageId: string,
  wordIds: string[],
  wordsLimit: number,
): Promise<Mutation['removeWords']> {
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
        offset: 0,
        limit: wordsLimit,
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
          offset: 0,
          limit: wordsLimit,
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
