import { ExpressResponder } from '../drivers';
import { DataStore, Responder } from '../../interfaces/interfaces';
import { Router, Response } from 'express';
import { UserInteractor } from '../../interactors/UserInteractor';
import { AuthInteractor } from '../../interactors/AuthInteractor';
import { DishInteractor } from '../../interactors/DishInteractor';
// This refers to the package.json that is generated in the dist. See /gulpfile.js for reference.
// tslint:disable-next-line:no-require-imports
const version = require('../../package.json').version;

export class ExpressRouteDriver {
  constructor(private dataStore: DataStore) {}

  public static buildRouter(dataStore: DataStore): Router {
    let e = new ExpressRouteDriver(dataStore);
    let router: Router = Router();
    e.setRoutes(router);
    return router;
  }

  private getResponder(response: Response): Responder {
    return new ExpressResponder(response);
  }

  private setRoutes(router: Router): void {
    router.get('/', async (req, res) => {
      res.json({
        version,
        message: `Welcome to the Gordon's Kitchen API v${version}`,
      });
    });

    // USER ROUTES
    router.post('/users', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const username = req.body.username;
        const password = req.body.password;
        const user = AuthInteractor.register(
          this.dataStore,
          username,
          password,
        );
        responder.sendObject(user);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    router.post('/users/login', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const username = req.body.username;
        const password = req.body.password;
        const user = AuthInteractor.login(this.dataStore, username, password);
        responder.sendObject(user);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    router.post('/users/completed', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const userID = req.body.userID;
        const dishID = req.body.dishID;
        const score = +req.body.score;
        const user = UserInteractor.insertCompletion(
          this.dataStore,
          userID,
          dishID,
          score,
        );
        responder.sendObject(user);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    router.get('/users', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const username = req.query.username;
        const users = await UserInteractor.fetchUsers(this.dataStore, username);
        responder.sendObject(users);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    router.get('/users/:id', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const id = req.params.id;
        const user = await UserInteractor.fetchUser(this.dataStore, id);
        responder.sendObject(user);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    router.get('/users/:id/friends', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const id = req.params.id;
        const friends = await UserInteractor.fetchFriends(this.dataStore, id);
        responder.sendObject(friends);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });

    // DISH ROUTES
    router.get('/dishes', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const dishes = await DishInteractor.fetchDishes(this.dataStore);
        responder.sendObject(dishes);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });
    router.get('/dishes/:id', async (req, res) => {
      const responder = this.getResponder(res);
      try {
        const id = req.params.id;
        const dish = await DishInteractor.fetchDish(this.dataStore, id);
        responder.sendObject(dish);
      } catch (e) {
        responder.sendOperationError(e);
      }
    });
  }
}
