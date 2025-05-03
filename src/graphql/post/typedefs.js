import { gql } from 'apollo-server';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post!
    posts(input: ApiFiltersInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
    indexRef: Int!
    createdAt: String!
    user: User!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }
`;
