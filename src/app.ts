import { ExpressDriver, SQLDriver } from './drivers/drivers';
import { DataStore } from './interfaces/interfaces';

// ----------------------------------------------------------------------------------
// Initializations
// ----------------------------------------------------------------------------------
let dataStore: DataStore = new SQLDriver();
// ----------------------------------------------------------------------------------
ExpressDriver.start(dataStore);
