export interface SubredditData {
  name: string;
}

export interface SubredditListData {
  subreddits: Array<SubredditData>;
}

export const DEFAULT_SUBREDDIT = '';
export const DEFAULT_SUBREDDITS_LIST = { subreddits: [] };

const stripToAlphaNumUnderscore = (s: string) => s.replace(/[^\w]/g, '');
export const cleanSubredditName = (s: string) =>
  stripToAlphaNumUnderscore(s).toLowerCase();


export const searchSubredditsURL = (search: string = '') =>
  `https://www.reddit.com/api/subreddit_autocomplete.json?query=${search}&include_over_18=0&include_profiles=0`;
