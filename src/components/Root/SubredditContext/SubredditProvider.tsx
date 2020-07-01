import React, { useState, ReactNode } from 'react';

import SubredditContext, { defaultSubreddit } from './SubredditContext';

type SubredditProviderProps = {
  children: ReactNode;
};

export const SubredditProvider = ({ children }: SubredditProviderProps) => {
  const [subreddit, setSubreddit] = useState(defaultSubreddit);

  return (
    <SubredditContext.Provider value={{ subreddit, setSubreddit }}>
      {children}
    </SubredditContext.Provider>
  );
};

export default SubredditProvider;
