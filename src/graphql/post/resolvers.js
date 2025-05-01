const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);

  if (Math.random() > 0.5) {
    return {
      statusCode: 404,
      message: 'Post timeout!',
      timeout: 123,
    };
  }

  if (response.status === 404) {
    return {
      statusCode: '404',
      message: 'Post not found',
      postId: '23',
    };
  }
  const post = await response.json();
  return post;
};

export const posts = async (_, { input }, { getPosts }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('?' + apiFiltersInput);
  return response.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  PostResult: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      if (typeof obj.id !== 'undefined') return 'Post';
      return null;
    },
  },
  PostError: {
    __resolveType: (obj) => {
      if (typeof obj.postId !== 'undefined') return 'PostNotFoundError';
      if (typeof obj.timeout !== 'undefined') return 'PostTimeoutError';
      return null;
    },
  },
};
