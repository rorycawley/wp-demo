import { useContext } from 'react';
import SubredditContext from './SubredditContext';

export const useSubreddit = () => useContext(SubredditContext);
