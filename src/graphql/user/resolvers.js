import { AuthenticationError } from 'apollo-server';
import { checkOwner } from '../login/utils/auth-functions';

const user = async (_, { id }, { dataSources }) => {
  const user = dataSources.userApi.getUser(id);
  return user;
};

const users = async (_, { input }, { dataSources }) => {
  const users = dataSources.userApi.getUsers(input);
  return users;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

// mutation resolvers

const createUser = async (_, { data }, { dataSources }) => {
  return dataSources.userApi.createUser(data);
};

const updateUser = async (
  _,
  { userId, data },
  { dataSources, loggedUserId },
) => {
  checkOwner(userId, loggedUserId);

  return dataSources.userApi.updateUser(userId, data);
};

const deleteUser = async (_, { userId }, { dataSources, loggedUserId }) => {
  checkOwner(userId, loggedUserId);

  return dataSources.userApi.deleteUser(userId);
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};
