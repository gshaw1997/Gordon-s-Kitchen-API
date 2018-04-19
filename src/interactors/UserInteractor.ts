import { DataStore, Responder } from '../interfaces/interfaces';

export class UserInteractor {
  static async fetchUser(
    dataStore: DataStore,
    responder: Responder,
    id: string,
  ): Promise<void> {
    try {
      const user = await dataStore.fetchUser(id);
      responder.sendObject(user);
    } catch (e) {
      responder.sendOperationError(`Error fetching user. Error ${e}`);
    }
  }
}
