import { User, Dish } from '../models/models';

export interface DataStore {
  connect(dbConfig: any): Promise<void>;
  disconnect(): Promise<void>;
  addUser(username: string, password: string): Promise<User>;
  findUser(username: string): Promise<string>;
  fetchUsers(username?: string): Promise<User[]>;
  fetchUser(id: string): Promise<User>;
  updateLastSignOn(id: string): Promise<void>;
  fecthFriends(userID: string): Promise<User[]>;
  fetchDishes(difficulty?: string): Promise<Dish[]>;
  fetchDish(id: string): Promise<Dish>;
  addCompletion(userID: string, dishID: string, score: number): Promise<void>;
}
