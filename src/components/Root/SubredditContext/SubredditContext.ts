import React, { createContext } from 'react';

export type SubredditContextType = {
  subreddit: string;
  setSubreddit: (subreddit: string) => void;
};
export const defaultSubreddit = '';

const SubredditContext = createContext<SubredditContextType | undefined>(
  undefined
);

export default SubredditContext;
