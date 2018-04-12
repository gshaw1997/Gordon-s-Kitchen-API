import {
  DataStore,
  Responder
} from '../interfaces/interfaces';

export class ObjectInteractor {

  public static async samplFunction(
    dataStore: DataStore,
    responder: Responder
    ): Promise<void> {
    try {
      
    } catch (e) {
      responder.sendOperationError(e);
    }
  }

}
