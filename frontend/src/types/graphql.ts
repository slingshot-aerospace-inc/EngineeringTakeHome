export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Player = {
  __typename?: 'Player';
  age: Scalars['Float'];
  foot: Scalars['String'];
  name: Scalars['String'];
  position: Array<Scalars['String']>;
  rating: Scalars['Float'];
  team: Scalars['String'];
};

export type PlayerResponse = {
  __typename?: 'PlayerResponse';
  players: Array<Player>;
};

export type Query = {
  __typename?: 'Query';
  getPlayers: PlayerResponse;
  getSomething: SomethingResponse;
};

export type SomethingResponse = {
  __typename?: 'SomethingResponse';
  something: Scalars['Float'];
};
