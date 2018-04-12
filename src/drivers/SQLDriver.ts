import { DataStore } from '../interfaces/interfaces';
import * as dotenv from 'dotenv';
dotenv.config();



export class SQLDriver implements DataStore {
  
  private db: any;

  constructor() {}

  connect(dburi: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  disconnect(): void {
    throw new Error("Method not implemented.");
  }

 
}


