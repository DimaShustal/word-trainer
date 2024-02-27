import { gql } from '@apollo/client';
import api from '../../functions/api';

async function fetchUser() {
  const client = await api.getClient();
  const { data } = await client.query({
    query: gql`
      query {
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

  return data?.user;
}

async function login(name, password) {
  const client = await api.getClient();
  const { data } = await client.mutate({
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

  return data?.login;
}

async function createUser(name, password) {
  const client = await api.getClient();
  const { data } = await client.mutate({
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

  return data?.createUser;
}

const UserApi = {
  fetchUser,
  login,
  createUser,
};

export default UserApi;
