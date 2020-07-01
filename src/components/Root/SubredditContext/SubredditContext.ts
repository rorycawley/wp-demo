import React, { createContext } from 'react';

export type SubredditContextType = {
  subreddit: string;
  setSubreddit: (subreddit: string) => void;
};

const SubredditContext = createContext<SubredditContextType | undefined>(
  undefined
);

export default SubredditContext;
