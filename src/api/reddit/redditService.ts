const REDDIT_API_URI = 'https://www.reddit.com';
const REDDIT_POSTS_PER_PAGE = '10';
export type SubredditData = {
  name: string;
};

export type SubredditListData = {
  subreddits: Array<SubredditData>;
};

export type SubredditPost = {
  title: string;
  link_flair_text: string;
  likes: string | null;
  id: string;
  name: string;
};

export type SubredditPostData = {
  kind: string;
  data: SubredditPost;
};

enum RedditResponseKind {
  LISTING = 'Listing',
}

export type SubredditPostListData = {
  kind: RedditResponseKind.LISTING;
  data: {
    modhash: string;
    dist: number;
    children: Array<SubredditPostData>;
    after: string | null;
    before: string | null;
  };
};

export const DEFAULT_SUBREDDIT = '';
export const DEFAULT_SUBREDDITS_LIST = { subreddits: [] };
export const DEFAULT_POSTS_LIST: SubredditPostListData = {
  kind: RedditResponseKind.LISTING,
  data: {
    dist: -1,
    modhash: '',
    children: [],
    after: null,
    before: null,
  },
};
const stripToAlphaNumUnderscore = (s: string) => s.replace(/[^\w]/g, '');
export const cleanSubredditName = (s: string) =>
  stripToAlphaNumUnderscore(s).toLowerCase();

export const searchSubredditsURL = (search: string = '') =>
  `${REDDIT_API_URI}/api/subreddit_autocomplete.json?query=${search}&include_over_18=0&include_profiles=0`;

const subredditUri = (
  subreddit: string,
  after: string,
  before: string,
  limit: string,
  nsfw: string
): string =>
  `/r/${
    subreddit ? `${subreddit}` : 'all'
  }/new.json?nsfw=${nsfw}&limit=${limit}` +
  (before ? `&before=${before}` : '') +
  (after ? `&after=${after}` : '');

export const subredditPostsUrl = (
  subreddit = 'all',
  after = '',
  before = '',
  limit = REDDIT_POSTS_PER_PAGE,
  nsfw = '0',
  baseURL = REDDIT_API_URI
): string => baseURL + subredditUri(subreddit, after, before, limit, nsfw);

// export const initialSubredditPostsURL = (subreddit: string) =>
//   subredditPostsUrl(subreddit);
// export const nextPageSubredditPostsURL = (subreddit: string, after: string) =>
//   subredditPostsUrl(subreddit, after);
// export const prevPageSubredditPostsURL = (subreddit: string, before: string) =>
//   subredditPostsUrl(subreddit, '', before);
