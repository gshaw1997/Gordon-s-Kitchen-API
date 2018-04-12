
export interface DataStore {
  connect(dburi: string): Promise<void>;
  disconnect(): void;
}


