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

export const userResolvers = {
  Query: {
    user,
    users,
  },
  User: {
    posts,
  },
};
