import { buildSchema } from 'graphql';

const schema = buildSchema(`
  interface Node {
    id: ID!
  }

  type Language implements Node {
    id: ID!
    name: String!
    code: String!
    translationCode: String!
  }

  type User implements Node {
    id: ID!
    name: String!
    languages: [Language]!
  }
  
  type UserWord implements Node {
    id: ID!
    word: String!
    translation: String!
    lastUse: Float
  }
  
  type PageInfo {
    totalCount: Int!
    hasNextPage: Boolean!
  }
  
  type UserWordResponse {
    edges: [UserWord!]!
    pageInfo: PageInfo!
  }
  
  input UserWordInput {
    id: ID!
    lastUse: Float!
  }
  
  type Query {
    user: User
    languages: [Language!]!
    userWords(languageId: ID!, offset: Int!, limit: Int!): UserWordResponse
  }

  type Mutation {
    createUser(name: String!, password: String!): String
    login(name: String!, password: String!): String
    addWordsFromTranslation(languageId: ID!, translations: [String]!): [UserWord]
    updateWords(languageId: ID!, words: [UserWordInput]!): Boolean
    removeWords(languageId: ID!, wordIds: [ID]!): Boolean
  }
`);

export default schema;
