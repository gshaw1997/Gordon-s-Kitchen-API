/*
* Driver for MySQL
*/

import { DataStore } from '../interfaces/interfaces';
import * as dotenv from 'dotenv';
import { User, Dish } from '../models/models';
dotenv.config();

import * as mysql from 'mysql';
import { RecipeStep, XPReward, RecipeOption } from '../models/Dish';
import {
  AccountHistory,
  Completed,
  PlayerLevel,
  UserRoles,
  START_XP,
} from '../models/User';

export type MySQLConfig = mysql.ConnectionConfig;

export const TABLES = {
  ACCOUNT_HISTORY: 'account_history',
  COMPLETED: 'completed',
  CREDITS: 'credits',
  DISHES: 'dishes',
  FRIENDS: 'friends',
  IMAGES: 'images',
  OPTIONS: 'options',
  PLAYER_LEVEL: 'player_level',
  PROMPTS: 'prompts',
  REACTIONS: 'reactions',
  SCORES: 'scores',
  STEPS: 'steps',
  USERS: 'users',
  USER_ROLES: 'user_roles',
  XP_REWARDS: 'xp_reward',
};

export class SQLDriver implements DataStore {
  private db: mysql.Connection;

  constructor() {
    const config: MySQLConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
    };
    this.connect(config);
  }
  /**
   * Establishes connection to MySQL Server
   *
   * @param {MySQLConfig} config
   * @returns {Promise<void>}
   * @memberof SQLDriver
   */
  public async connect(config: MySQLConfig): Promise<void> {
    try {
      this.db = await mysql.createConnection(config);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Ends connection to MySQLServer
   *
   * @returns {Promise<void>}
   * @memberof SQLDriver
   */
  public async disconnect(): Promise<void> {
    try {
      await this.db.end();
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Inserts new User, Account History, and adds User to User Roles
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<User>}
   * @memberof SQLDriver
   */
  public async addUser(username: string, password: string): Promise<User> {
    try {
      const createdDate = Date.now().toString();
      await new Promise<string>((resolve, reject) => {
        this.db.query(
          `INSERT INTO ${
            TABLES.USERS
          } (username, password, total_xp) VALUES ('${username}', '${password}', ${START_XP});
        INSERT INTO ${
          TABLES.ACCOUNT_HISTORY
        } (user_id, created_on, last_signed_on) VALUES (LAST_INSERT_ID(), '${createdDate}', '${createdDate}');
        INSERT INTO ${
          TABLES.USER_ROLES
        } (user_id, role) VALUES (LAST_INSERT_ID(), '${UserRoles.Player}');`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            resolve(results);
          },
        );
      });
      const id = await this.findUser(username);
      return await this.fetchUser(id);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches ID of User
   *
   * @param {string} username
   * @returns {Promise<string>}
   * @memberof SQLDriver
   */
  public async findUser(username: string): Promise<string> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.USERS}.id FROM ${
            TABLES.USERS
          } WHERE username='${username}'`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      if (row) {
        return row.id;
      }
      return row;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches all Users
   *
   * @param {string} username
   * @returns {Promise<User[]>}
   * @memberof SQLDriver
   */
  public async fetchUsers(username?: string): Promise<User[]> {
    try {
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.USERS}.id, ${TABLES.USERS}.username, ${
            TABLES.USERS
          }.password, ${TABLES.USERS}.total_xp, ${
            TABLES.USER_ROLES
          }.role FROM ${TABLES.USERS} INNER JOIN ${TABLES.USER_ROLES} ON ${
            TABLES.USERS
          }.id=${TABLES.USER_ROLES}.user_id ${
            username
              ? 'AND ' + TABLES.USERS + '.username LIKE ' + '%' + username + '%'
              : ''
          }`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const users: User[] = [];

      for (const row of rows) {
        const user = await this.generateUser(row);
        users.push(user);
      }
      return users;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches User
   *
   * @param {string} id
   * @returns {Promise<User>}
   * @memberof SQLDriver
   */
  public async fetchUser(id: string): Promise<User> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.USERS}.id, ${TABLES.USERS}.username, ${
            TABLES.USERS
          }.password, ${TABLES.USERS}.total_xp, ${
            TABLES.USER_ROLES
          }.role FROM ${TABLES.USERS} INNER JOIN ${TABLES.USER_ROLES} ON ${
            TABLES.USERS
          }.id=${TABLES.USER_ROLES}.user_id AND ${TABLES.USERS}.id=${id}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      const user = await this.generateUser(row);
      return user;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches User's Account History
   *
   * @private
   * @param {string} userid
   * @returns {Promise<AccountHistory>}
   * @memberof SQLDriver
   */
  private async fetchAccountHistory(userid: string): Promise<AccountHistory> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.ACCOUNT_HISTORY}.created_on, ${
            TABLES.ACCOUNT_HISTORY
          }.last_signed_on FROM ${TABLES.ACCOUNT_HISTORY} WHERE ${
            TABLES.ACCOUNT_HISTORY
          }.user_id=${userid}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const history: AccountHistory = {
        createdOn: row.created_on,
        lastSignedOn: row.last_signed_on,
      };

      return history;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Updates last sign on time
   *
   * @param {string} id
   * @returns {Promise<void>}
   * @memberof SQLDriver
   */
  public async updateLastSignOn(id: string): Promise<void> {
    try {
      const signOnTime = Date.now().toString();
      await new Promise<any>((resolve, reject) => {
        this.db.query(
          `UPDATE ${TABLES.ACCOUNT_HISTORY} SET ${
            TABLES.ACCOUNT_HISTORY
          }.last_signed_on=${signOnTime} WHERE ${
            TABLES.ACCOUNT_HISTORY
          }.user_id=${id}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches User's Completion history
   *
   * @private
   * @param {string} userid
   * @returns {Promise<Completed[]>}
   * @memberof SQLDriver
   */
  private async fetchCompleted(userid: string): Promise<Completed[]> {
    try {
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.COMPLETED}.dish_id, ${
            TABLES.COMPLETED
          }.score_id FROM ${TABLES.COMPLETED} WHERE ${
            TABLES.COMPLETED
          }.user_id=${userid}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const completed: Completed[] = [];

      for (const row of rows) {
        const completion: Completed = {
          dishID: row.dish_id,
          score: await this.fetchScore(row.score_id),
        };
        completed.push(completion);
      }

      return completed;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches Score related to Completion
   *
   * @private
   * @param {string} scoreID
   * @returns {Promise<number>}
   * @memberof SQLDriver
   */
  private async fetchScore(scoreID: string): Promise<number> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.SCORES}.score FROM ${TABLES.SCORES} WHERE ${
            TABLES.SCORES
          }.id=${scoreID}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      const score = +row.score;
      return score;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetchs Player Level by XP
   *
   * @private
   * @param {number} xp
   * @returns {Promise<PlayerLevel>}
   * @memberof SQLDriver
   */
  private async fetchPlayerLevel(xp: number): Promise<PlayerLevel> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.PLAYER_LEVEL}.level_num, ${
            TABLES.PLAYER_LEVEL
          }.level_name, ${TABLES.PLAYER_LEVEL}.description FROM ${
            TABLES.PLAYER_LEVEL
          } WHERE ${TABLES.PLAYER_LEVEL}.xp <= ${xp} ORDER BY ${
            TABLES.PLAYER_LEVEL
          }.xp DESC`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      const level: PlayerLevel = {
        name: row.level_name,
        number: +row.level_num,
        description: row.description,
      };
      return level;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches User's Friends
   *
   * @param {string} userID
   * @returns {Promise<User[]>}
   * @memberof SQLDriver
   */
  public async fecthFriends(userID: string): Promise<User[]> {
    try {
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.FRIENDS}.player_id WHERE ${
            TABLES.FRIENDS
          }.user_id= ${userID}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      const friends: User[] = [];

      for (const row of rows) {
        const friend = await this.fetchUser(row.player_id);
        friends.push(friend);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches all Dishes
   *
   * @returns {Promise<Dish[]>}
   * @memberof SQLDriver
   */
  public async fetchDishes(difficulty?: string): Promise<Dish[]> {
    try {
      let query = `SELECT * FROM ${TABLES.DISHES}`;
      if (difficulty) {
        query += ` WHERE ${TABLES.DISHES}.difficulty='${difficulty}'`;
      }
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(query, (e, results, fields) => {
          if (e) {
            reject(e);
          }
          if (results) {
            resolve(results);
          } else {
            reject('No result from query');
          }
        });
      });
      const dishes: Dish[] = [];
      for (const row of rows) {
        const dish = await this.generateDish(row);
        dishes.push(dish);
      }
      return dishes;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches Dish by ID
   *
   * @param {string} id
   * @returns {Promise<Dish>}
   * @memberof SQLDriver
   */
  public async fetchDish(id: string): Promise<Dish> {
    try {
      const rows = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.DISHES}.id, ${TABLES.DISHES}.name, ${
            TABLES.DISHES
          }.difficulty, ${TABLES.DISHES}.unlocked_at FROM ${
            TABLES.DISHES
          } WHERE ${TABLES.DISHES}.id =${id}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });
      const dish = this.generateDish(rows, true);
      return dish;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches Steps associated with Dish
   *
   * @private
   * @param {string} dishID
   * @returns {Promise<RecipeStep[]>}
   * @memberof SQLDriver
   */
  private async fetchRecipeSteps(dishID: string): Promise<RecipeStep[]> {
    try {
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.STEPS}.execution_order, ${
            TABLES.STEPS
          }.is_correct, ${TABLES.STEPS}.option_id FROM ${TABLES.STEPS} WHERE ${
            TABLES.STEPS
          }.dish_id=${dishID}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const steps: RecipeStep[] = [];
      const aggregateSteps: Map<number, RecipeStep> = new Map<
        number,
        RecipeStep
      >();

      for (const row of rows) {
        const index = +row.execution_order;
        let step: RecipeStep = aggregateSteps.get(index);
        if (!step) {
          step = {
            order: row.execution_order,
            options: [],
            correctOptions: [],
          };
        }
        if (row.is_correct) {
          step.correctOptions.push(row.option_id);
        }
        const option = await this.fetchRecipeOption(row.option_id);
        step.options.push(option);
        aggregateSteps.set(index, step);
      }

      aggregateSteps.forEach(step => {
        steps.push(step);
      });

      return steps;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches Options associated with Step
   *
   * @private
   * @param {string} optionID
   * @returns {Promise<RecipeOption>}
   * @memberof SQLDriver
   */
  private async fetchRecipeOption(optionID: string): Promise<RecipeOption> {
    try {
      const row = await new Promise<any>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.OPTIONS}.id,${TABLES.OPTIONS}.type, ${
            TABLES.OPTIONS
          }.description, ${TABLES.IMAGES}.url AS image FROM ${
            TABLES.OPTIONS
          } LEFT JOIN ${TABLES.IMAGES} ON ${TABLES.OPTIONS}.image_id=${
            TABLES.IMAGES
          }.id WHERE ${TABLES.OPTIONS}.id=${optionID}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results[0]);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const option: RecipeOption = {
        id: row.id,
        type: row.type,
        description: row.description,
        image: row.image,
      };

      return option;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches reward associated with Dish
   *
   * @private
   * @param {string} dishID
   * @returns {Promise<XPReward[]>}
   * @memberof SQLDriver
   */
  private async fetchRewards(dishID: string): Promise<XPReward[]> {
    try {
      const rows = await new Promise<any[]>((resolve, reject) => {
        this.db.query(
          `SELECT ${TABLES.XP_REWARDS}.penalties, ${
            TABLES.XP_REWARDS
          }.reward FROM ${TABLES.XP_REWARDS} WHERE ${
            TABLES.XP_REWARDS
          }.dish_id=${dishID}`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });

      const rewards: XPReward[] = [];
      for (const row of rows) {
        const reward: XPReward = {
          penalties: row.penalties,
          reward: row.reward,
        };
        rewards.push(reward);
      }
      return rewards;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Inserts new Completion
   *
   * @param {string} userID
   * @param {string} dishID
   * @param {number} score
   * @returns {Promise<void>}
   * @memberof SQLDriver
   */
  public async addCompletion(
    userID: string,
    dishID: string,
    score: number,
  ): Promise<void> {
    try {
      await new Promise<any>((resolve, reject) => {
        this.db.query(
          `INSERT INTO ${TABLES.SCORES} (score) VALUES (${score});
        INSERT INTO ${
          TABLES.COMPLETED
        } (user_id, dish_id, score_id) VALUES (${userID}, ${dishID}, LAST_INSERT_ID()); 
        UPDATE ${TABLES.USERS} SET ${TABLES.USERS}.total_xp=${
            TABLES.USERS
          }.total_xp + ${score} WHERE ${TABLES.USERS}.id=${userID};`,
          (e, results, fields) => {
            if (e) {
              reject(e);
            }
            if (results) {
              resolve(results);
            } else {
              reject('No result from query');
            }
          },
        );
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Generates User object
   *
   * @private
   * @param {*} row
   * @returns {Promise<User>}
   * @memberof SQLDriver
   */
  private async generateUser(row: any): Promise<User> {
    try {
      const userRow = row;
      const user: User = {
        id: row.id,
        username: row.username,
        password: row.password,
        totalXp: row.total_xp,
        level: await this.fetchPlayerLevel(+row.total_xp),
        accountHistory: await this.fetchAccountHistory(row.id),
        completed: await this.fetchCompleted(row.id),
        role: row.role,
      };
      return user;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Generates Dish Object
   *
   * @private
   * @param {*} rows
   * @param {boolean} [full]
   * @returns {Promise<Dish>}
   * @memberof SQLDriver
   */
  private async generateDish(rows: any, full?: boolean): Promise<Dish> {
    let dishRow = rows;
    if (rows.length) {
      dishRow = rows[0];
    }
    const dish: Dish = {
      id: dishRow.id,
      name: dishRow.name,
      difficulty: dishRow.difficulty,
      unlockedAt: dishRow.unlocked_at,
      steps: [],
      rewards: [],
    };
    if (full) {
      dish.steps = await this.fetchRecipeSteps(dish.id);
      dish.rewards = await this.fetchRewards(dish.id);
    }
    return dish;
  }
}
