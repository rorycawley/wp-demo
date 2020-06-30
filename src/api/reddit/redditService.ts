export const searchSubredditsURL = (search: string = '') =>
  `https://www.reddit.com/api/subreddit_autocomplete.json?query=${search}&include_over_18=0&include_profiles=0`;
