import { DataStore } from '../interfaces/interfaces';
import { User } from '../models/models';

export class UserInteractor {
  /**
   * Fetches all Users
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<User>}
   * @memberof UserInteractor
   */
  public static async fetchUsers(
    dataStore: DataStore,
    username?: string,
  ): Promise<User[]> {
    try {
      const users = await dataStore.fetchUsers(username);
      for (const user of users) {
        delete user.password;
      }
      return users;
    } catch (e) {
      return Promise.reject(`Problem fetching users. Error ${e}`);
    }
  }

  /**
   * Fetches User by ID
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<User>}
   * @memberof UserInteractor
   */
  public static async fetchUser(
    dataStore: DataStore,
    id: string,
  ): Promise<User> {
    try {
      const user = await dataStore.fetchUser(id);
      delete user.password;
      return user;
    } catch (e) {
      return Promise.reject(`Problem fetching user. Error ${e}`);
    }
  }

  /**
   * Fetches User's Friends
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<User[]>}
   * @memberof UserInteractor
   */
  public static async fetchFriends(
    dataStore: DataStore,
    id: string,
  ): Promise<User[]> {
    try {
      const friends = await dataStore.fecthFriends(id);
      for (const user of friends) {
        delete user.password;
      }
      return friends;
    } catch (e) {
      return Promise.reject(`Problem fetching friends. Error ${e}`);
    }
  }

  /**
   * Add User's Friend
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<User[]>}
   * @memberof UserInteractor
   */
  public static async addFriend(
    dataStore: DataStore,
    id: string,
    playerID: string,
  ): Promise<User[]> {
    try {
      const friends = await dataStore.addFriend(id, playerID);
      for (const user of friends) {
        delete user.password;
      }
      return friends;
    } catch (e) {
      return Promise.reject(`Problem adding friend. Error ${e}`);
    }
  }

  /**
   * Removes User's Friend
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<User[]>}
   * @memberof UserInteractor
   */
  public static async removeFriend(
    dataStore: DataStore,
    id: string,
    playerID: string,
  ): Promise<User[]> {
    try {
      const friends = await dataStore.removeFriend(id, playerID);
      for (const user of friends) {
        delete user.password;
      }
      return friends;
    } catch (e) {
      return Promise.reject(`Problem removing friend. Error ${e}`);
    }
  }

  /**
   * Inserts completion
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} userID
   * @param {string} dishID
   * @param {number} score
   * @returns {Promise<User>}
   * @memberof UserInteractor
   */
  public static async insertCompletion(
    dataStore: DataStore,
    userID: string,
    dishID: string,
    score: number,
  ): Promise<User> {
    try {
      await dataStore.addCompletion(userID, dishID, score);
      const user = await dataStore.fetchUser(userID);
      delete user.password;
      return user;
    } catch (e) {
      return Promise.reject(`Problem inserting completion. Error: ${e}`);
    }
  }
}
