import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }

  async getUser(userName) {
    const user = await this.get(
      '',
      {
        userName,
      },
      {
        cacheOptions: {
          ttl: 0,
        },
      },
    );

    const found = !!user.length;
    console.log(user);

    if (!found) {
      throw new AuthenticationError('User does not exist.');
    }

    return user;
  }

  async logout(userName) {
    const user = await this.getUser(userName);
    console.log(user);

    if (user[0].id !== this.context.loggedUserId) {
      throw new AuthenticationError('You are not this user');
    }

    await this.patch(user[0].id, { token: '' }, { cacheOptions: { ttl: 0 } });

    return true;
  }

  async login(userName, password) {
    const user = await this.getUser(userName);
    // console.log(user);
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('User does not exist.');
    }

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password.');
    }

    const token = this.createJwtToken({ userId });

    await this.patch(
      userId,
      { token },
      {
        cacheOptions: { ttl: 0 },
      },
    );

    return {
      userId,
      token,
    };
  }

  async checkUserPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createJwtToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }
}
