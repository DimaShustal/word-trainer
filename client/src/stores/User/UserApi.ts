import { LoginMutation, CreateUserMutation, Query, Mutation } from '../../__generated__/graphql';
import api from '../../functions/api';
import { gql } from '@apollo/client';

async function fetchUser(): Promise<Query['user']> {
  const client = await api.getClient();
  const { data } = await client.query<Query>({
    query: gql`
      query User {
        user {
          id
          name
          languages {
            id
            name
            code
          }
        }
      }
    `,
  });

  return data?.user as Query['user'];
}

async function login(name: string, password: string): Promise<LoginMutation['login']> {
  const client = await api.getClient();
  const { data } = await client.mutate<Mutation>({
    mutation: gql`
      mutation Login($name: String!, $password: String!) {
        login(name: $name, password: $password)
      }
    `,
    variables: {
      name,
      password,
    },
  });

  return data?.login as LoginMutation['login'];
}

async function createUser(name: string, password: string): Promise<CreateUserMutation['createUser']> {
  const client = await api.getClient();
  const { data } = await client.mutate<Mutation>({
    mutation: gql`
      mutation CreateUser($name: String!, $password: String!) {
        createUser(name: $name, password: $password)
      }
    `,
    variables: {
      name,
      password,
    },
  });

  return data?.createUser as CreateUserMutation['createUser'];
}

const UserApi = {
  fetchUser,
  login,
  createUser,
};

export default UserApi;
