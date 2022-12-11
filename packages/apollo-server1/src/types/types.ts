export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: "Book";
  author?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  imageLink?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  pages?: Maybe<Scalars["Int"]>;
  title?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type Author = {
  __typename?: "Author";
  name?: Maybe<Scalars["String"]>;
  books?: Maybe<BooksList>;
  id?: Maybe<Scalars["ID"]>;
  age?: Maybe<Scalars["Int"]>;
  alive?: Maybe<Alive>;
};

export type BooksList = [String];
export type Alive = { is_alive: Boolean; reason?: String };
