import { searchSubredditsURL } from '../../src/api/reddit';

describe('Reddit service', () => {
  it('creates the URL to get subreddits autocomlete', () => {
    expect(searchSubredditsURL('reactjs')).toEqual(
      'https://www.reddit.com/api/subreddit_autocomplete.json?query=reactjs&include_over_18=0&include_profiles=0'
    );
  });
});
