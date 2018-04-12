import { ExpressResponder } from '../drivers';
import { DataStore, Responder } from '../../interfaces/interfaces';
import { Router, Response } from 'express';
import { ObjectInteractor } from '../../interactors/interactors';
// This refers to the package.json that is generated in the dist. See /gulpfile.js for reference.
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
        message: `Welcome to the Gordon's Kitchen API v${version}`
      });
    });
  }
}
