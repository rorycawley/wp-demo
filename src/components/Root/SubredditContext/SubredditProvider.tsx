import React, { useState, ReactNode } from 'react';

import SubredditContext from './SubredditContext';
import { DEFAULT_SUBREDDIT } from '../../../api/reddit';

type SubredditProviderProps = {
  children: ReactNode;
};

export const SubredditProvider = ({ children }: SubredditProviderProps) => {
  const [subreddit, setSubreddit] = useState(DEFAULT_SUBREDDIT);

  return (
    <SubredditContext.Provider value={{ subreddit, setSubreddit }}>
      {children}
    </SubredditContext.Provider>
  );
};

export default SubredditProvider;
