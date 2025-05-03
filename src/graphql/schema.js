import { gql } from 'apollo-server';
import { userTypeDefs } from './user/typedefs';
import { userResolvers } from './user/resolvers';
import { postTypeDefs } from './post/typedefs';
import { postResolvers } from './post/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';
import { apiFilterResolvers } from './api-filters/resolvers';

// const rootTypeDefs = gql`
//   type Query {
//     hi: String
//   }

//   type Mutation {
//     hi: String
//   }
// `;

// const rootResolvers = {
//   Query: {
//     hi: () => 'hi',
//   },

//   Mutation: () => {
//     hi: () => 'hi';
//   },
// };

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },

  Mutation: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
];

export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFilterResolvers,
];
