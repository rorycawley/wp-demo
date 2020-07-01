import formatDistance from 'date-fns/formatDistance';
import { SubredditPost, SubredditPostNormalised } from './redditService';

const getScore = ({ score }: SubredditPost): string => score.toString();
const getNumCommments = ({ num_comments }: SubredditPost): string =>
  num_comments.toString();

const getCreated = ({ created_utc }: SubredditPost) =>
  formatDistance(created_utc * 1000, Date.now(), {
    addSuffix: true,
  });

const normalizeSubredditPost = (
  post: SubredditPost
): SubredditPostNormalised => {
  return {
    title: post.title,
    name: post.name,
    id: post.id,
    score: getScore(post),
    created: getCreated(post),
    author: post.author,
    num_comments: getNumCommments(post),
    text: post.selftext ? post.selftext : '',
    thumbnail: post.thumbnail !== 'self' ? post.thumbnail : '',
    url: post.url,
    link_flair_text: post.link_flair_text ? post.link_flair_text : '',
  };
};

export default normalizeSubredditPost;
