const user = async (_, { id }, { getUsers }) => {
  const response = await getUsers(id);
  return response.json();
};

const users = async (_, __, { getUsers }) => {
  const response = await getUsers();
  return response.json();
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
