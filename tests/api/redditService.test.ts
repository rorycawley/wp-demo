import { cleanSubredditName, searchSubredditsURL } from '../../src/api/reddit';

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
    console.log('this is the test: ');
    console.log(cleanSubredditName('    @#$@#%@$@#%@$#@$@') === '');
    console.log(
      testDataForcleanSubredditName.map(
        test => cleanSubredditName(test[0]) === test[1]
      )
    );
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
});
