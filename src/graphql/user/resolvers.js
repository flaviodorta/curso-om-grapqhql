const user = async (_, { id }, { getUsers }) => {
  const response = await getUsers(id);
  return response.json();
};

const users = async (_, __, { getUsers }) => {
  const response = await getUsers();
  return response.json();
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
