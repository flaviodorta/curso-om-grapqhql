import { RESTDataSource } from 'apollo-datasource-rest';
import { makeUserDataLoader } from './dataloaders';
import {
  createUserFn,
  deleteUserFn,
  updateUserFn,
} from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParam = {}) {
    return this.get('', urlParam, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  async getUser(id) {
    return this.get(id, undefined, {
      cacheOptions: {
        ttl: 60,
      },
    });
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }

  async createUser(data) {
    return createUserFn(data, this);
  }

  async updateUser(userId, data) {
    return updateUserFn(userId, data, this);
  }

  async deleteUser(userId) {
    return deleteUserFn(userId, this);
  }
}
