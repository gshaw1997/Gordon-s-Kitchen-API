export type User = {
  id?: string;
  username: string;
  password?: string;
  totalXp: number;
  level: PlayerLevel;
  friends?: User[];
  accountHistory: AccountHistory;
  completed?: Completed[];
  role?: string;
};

export type PlayerLevel = {
  name: string;
  number: number;
  description: string;
  xpNeeded?: number;
  nextLevel?: PlayerLevel;
};

export type AccountHistory = {
  createdOn: string;
  lastSignedOn: string;
};

export type Completed = {
  dishID: string;
  score: number;
};

export enum UserRoles {
  Player = 'player',
  Admin = 'admin',
}

export const START_XP = 0;
