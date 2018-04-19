export interface DataStore {
  connect(dburi: string): Promise<void>;
  disconnect(): void;
  fetchUser(id: string): Promise<any>;
}
