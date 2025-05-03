import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';
import { context } from './graphql/context';
import { PostsApi } from './graphql/post/datasources';
import { UserApi, UsersApi } from './graphql/user/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UserApi(),
    };
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listen in port ${url}`);
});
