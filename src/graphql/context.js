import jwt from 'jsonwebtoken';
import { UsersApi } from '../graphql/user/datasources';

const authorizeUser = async (req) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const [_, token] = authorization.split(' ');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi();
    userApi.initialize({});
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return '';

    return userId;
  } catch (e) {
    return '';
  }
};

export const context = async ({ req }) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
  };
};
