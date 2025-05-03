// query resolver

const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

export const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// mutation resolvers

const createPost = async (_, args, { dataSources }) => {
  console.log(args);
  return {
    id: '860',
    title: 'Testando',
    body: 'Ad non pariatur. Aut molestias accusamus et inventore sunt voluptates non doloremque illum. Perspiciatis et provident vel et fugiat dolores ut. Quos quibusdam impedit cupiditate quia at eaque quae.',
    userId: '29',
    indexRef: 10,
    createdAt: '2018-08-10T23:41:51.714Z',
  };
};

// field resolver

const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadByUserId(userId);
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Mutation: { createPost },
  Post: {
    user,
  },
};
