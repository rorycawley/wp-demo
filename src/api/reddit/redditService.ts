const REDDIT_API_URI = 'https://www.reddit.com';
export const REDDIT_POSTS_PER_PAGE = 10;
export const DEFAULT_SUBREDDIT = '';
export const DEFAULT_SUBREDDITS_LIST = { subreddits: [] };
export const DEFAULT_POSTS_LIST: SubredditListOfPostsRaw = {
  kind: 'Listing',
  data: {
    dist: -1,
    modhash: '',
    children: [],
    after: null,
    before: null,
  },
};

export type SubredditData = {
  name: string;
};

export type SubredditListData = {
  subreddits: Array<SubredditData>;
};

export type SubredditPostNormalised = {
  author: string;
  created: string;
  id: string;
  link_flair_text: string;
  name: string;
  num_comments: string;
  score: string;
  text: string;
  thumbnail: string;
  title: string;
  url: string;
};

export type SubredditPost = {
  author: string;
  created_utc: number;
  id: string;
  link_flair_text: string | null;
  name: string;
  num_comments: number;
  score: number;
  selftext: string | null;
  thumbnail: string;
  title: string;
  url: string;
};

export interface SubredditPostData {
  kind: string;
  data: SubredditPost;
}

export interface SubredditListOfPostsData {
  modhash: string;
  dist: number;
  children: SubredditPostData[];
  after?: string | null;
  before?: string | null;
}

export interface SubredditListOfPostsRaw {
  kind: string;
  data: SubredditListOfPostsData;
}

export const subredditsFromListData = (subredditListData: {
  data: {
    children: {
      data: {
        author: string;
        created_utc: number;
        id: string;
        link_flair_text: string | null;
        name: string;
        num_comments: number;
        score: number;
        selftext: string | null;
        thumbnail: string;
        title: string;
        url: string;
      };
    }[];
  };
}) => {
  const arrayRawSubredditData = subredditListData.data.children;
  return arrayRawSubredditData.map(item => item.data);
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
  count: number,
  limit: number,
  nsfw: string
): string =>
  `/r/${
    subreddit ? `${subreddit}` : 'all'
  }/new.json?nsfw=${nsfw}&limit=${limit}&count=${count}` +
  (before ? `&before=${before}` : '') +
  (after ? `&after=${after}` : '');

export const subredditPostsUrl = (
  subreddit = 'all',
  after = '',
  before = '',
  count = 0,
  limit = REDDIT_POSTS_PER_PAGE,
  nsfw = '0',
  baseURL = REDDIT_API_URI
): string =>
  baseURL + subredditUri(subreddit, after, before, count, limit, nsfw);
