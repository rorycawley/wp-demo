import {
  cleanSubredditName,
  searchSubredditsURL,
  subredditPostsUrl,
} from '../../src/api/reddit';

describe('Reddit service', () => {
  it('cleanSubredditName', () => {
    const testDataForcleanSubredditName = [
      ['ABC', 'abc'],
      ['ABc', 'abc'],
      ['A c', 'ac'],
      [' aB ', 'ab'],
      ['$% AB c', 'abc'],
      [' 2 234@#$@ SFS __@#$', '2234sfs__'],
      ['    @#$@#%@$@#%@$#@$@', ''],
      ['__________', '__________'],
      ['!@#!@$!@$!@$#!$!!%!%!%!!%^^%*$*', ''],
    ];

    expect(
      testDataForcleanSubredditName
        .map(test => cleanSubredditName(test[0]) === test[1])
        .reduce((acc, c) => acc && c)
    ).toBeTruthy();
  });

  it('creates the URL to get subreddits autocomlete', () => {
    expect(searchSubredditsURL('reactjs')).toEqual(
      'https://www.reddit.com/api/subreddit_autocomplete.json?query=reactjs&include_over_18=0&include_profiles=0'
    );
  });

  it('creates a correct URL when you provide no subreddit', () => {
    expect(subredditPostsUrl('')).toEqual(
      'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10'
    );
    expect(subredditPostsUrl()).toEqual(
      'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10'
    );
  });

  it('creates a correct URL posts with just a subreddit parameter', () => {
    expect(subredditPostsUrl('reactjs')).toEqual(
      'https://www.reddit.com/r/reactjs/new.json?nsfw=0&limit=10'
    );
  });

  it('creates a correct URL posts with a subreddit parameter and an after parameter', () => {
    expect(subredditPostsUrl('reactjs', 'afterThis')).toEqual(
      'https://www.reddit.com/r/reactjs/new.json?nsfw=0&limit=10&after=afterThis'
    );
  });

  it('creates a correct URL posts with a subreddit parameter and a before parameter', () => {
    expect(subredditPostsUrl('reactjs', '', 'beforeThis')).toEqual(
      'https://www.reddit.com/r/reactjs/new.json?nsfw=0&limit=10&before=beforeThis'
    );
  });
});
