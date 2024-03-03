import { Mutation, UserWordInput } from '../../__generated__/graphql';
import api from '../../functions/api';
import { gql } from '@apollo/client';

async function updateWords(languageId: string, words: UserWordInput[]): Promise<Mutation['updateWords']> {
  const client = await api.getClient();
  const { data } = await client.mutate<Mutation>({
    mutation: gql`
      mutation UpdateWords($languageId: ID!, $words: [UserWordInput]!) {
        updateWords(languageId: $languageId, words: $words)
      }
    `,
    variables: {
      languageId,
      words,
    },
  });

  if (data?.updateWords) {
    words.forEach(word => {
      client.writeFragment({
        id: `UserWord:${word.id}`,
        fragment: gql`
          fragment UpdatedUserWord on UserWord {
            lastUse
          }
        `,
        data: {
          lastUse: word.lastUse,
        },
      });
    });
  }

  return data?.updateWords as Mutation['updateWords'];
}

const WordApi = {
  updateWords,
};

export default WordApi;
