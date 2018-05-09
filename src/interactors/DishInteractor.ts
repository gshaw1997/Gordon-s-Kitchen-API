import { DataStore } from '../interfaces/interfaces';
import { Dish } from '../models/models';

export class DishInteractor {
  /**
   * Fetches all dishes
   *
   * @static
   * @param {DataStore} dataStore
   * @returns {Promise<Dish[]>}
   * @memberof DishInteractor
   */
  public static async fetchDishes(
    dataStore: DataStore,
    difficulty?: string,
  ): Promise<Dish[]> {
    try {
      const dishes = await dataStore.fetchDishes(difficulty);
      return dishes;
    } catch (e) {
      return Promise.reject(`Problem fetching dishes. Error: ${e}`);
    }
  }

  /**
   * Fetches Dish by ID
   *
   * @static
   * @param {DataStore} dataStore
   * @param {string} id
   * @returns {Promise<Dish>}
   * @memberof DishInteractor
   */
  public static async fetchDish(
    dataStore: DataStore,
    id: string,
  ): Promise<Dish> {
    try {
      const dish = await dataStore.fetchDish(id);
      return dish;
    } catch (e) {
      return Promise.reject(`Problem fetching dish. Error: ${e}`);
    }
  }
}
