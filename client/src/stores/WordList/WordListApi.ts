import api from '../../functions/api';
import { gql } from '@apollo/client';
import { Mutation, Query } from '../../__generated__/graphql';

const DEFAULT_CACHE_USER_WORDS = {
  userWords: {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      totalCount: 0,
    },
  },
};

const UserWordsEdge = gql`
  fragment UserWordsEdge on UserWord {
    id
    word
    translation
    lastUse
  }
`;

const UserWordsQuery = gql`
  ${UserWordsEdge}

  query UserWords($languageId: ID!, $offset: Int!, $limit: Int!) {
    userWords(languageId: $languageId, offset: $offset, limit: $limit) {
      edges {
        ...UserWordsEdge
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
  totalCount: number,
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
        limit: totalCount,
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
          limit: newData.userWords.edges.length,
        },
        data: newData,
      });
    }
  }

  return data?.removeWords as Mutation['removeWords'];
}

async function addWordsFromTranslation(
  languageId: string,
  translations: string[],
  totalCount: number,
): Promise<Mutation['addWordsFromTranslation']> {
  const client = await api.getClient();

  const { data } = await client.mutate<Mutation>({
    mutation: gql`
      ${UserWordsEdge}

      mutation AddWordsFromTranslation($languageId: ID!, $translations: [String]!) {
        addWordsFromTranslation(languageId: $languageId, translations: $translations) {
          ...UserWordsEdge
        }
      }
    `,
    variables: {
      languageId,
      translations,
    },
  });

  if (data?.addWordsFromTranslation?.length) {
    const cachedUserWords =
      client.readQuery({
        query: UserWordsQuery,
        variables: {
          languageId: languageId,
          offset: 0,
          limit: totalCount,
        },
      }) || DEFAULT_CACHE_USER_WORDS;

    const newData = {
      userWords: {
        ...cachedUserWords.userWords,
        edges: [...data.addWordsFromTranslation, ...cachedUserWords.userWords.edges],
        pageInfo: {
          ...cachedUserWords.userWords.pageInfo,
          totalCount: cachedUserWords.userWords.pageInfo.totalCount + data.addWordsFromTranslation.length,
        },
      },
    };

    client.writeQuery({
      query: UserWordsQuery,
      variables: {
        languageId: languageId,
        offset: 0,
        limit: newData.userWords.edges.length,
      },
      data: newData,
    });
  }

  return data?.addWordsFromTranslation as Mutation['addWordsFromTranslation'];
}

const WordListApi = {
  fetchUserWords,
  removeWords,
  addWordsFromTranslation,
};

export default WordListApi;
