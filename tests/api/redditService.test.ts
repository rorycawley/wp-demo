import {
  cleanSubredditName,
  searchSubredditsURL,
  subredditPostsUrl,
} from '../../src/api/reddit';
import normalizeSubredditPost from '../../src/api/reddit/normalizeSubredditPost';
import {
  postJson1,
  postJson2,
  postJson3,
  postJson4,
} from '../common/testData/posts';

describe('Reddit service', () => {
  it('cleans text to become an accepted SubredditName', () => {
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

  it('creates the subreddit list URL with subreddit input', () => {
    expect(searchSubredditsURL('reactjs')).toEqual(
      'https://www.reddit.com/api/subreddit_autocomplete.json?query=reactjs&include_over_18=0&include_profiles=0'
    );
  });

  it('creates a correct URL when you provide no subreddit', () => {
    expect(subredditPostsUrl('')).toEqual(
      'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10&count=0'
    );
  });

  it('creates a correct URL posts with a subreddit parameter and an after parameter', () => {
    expect(subredditPostsUrl('reactjs', 'afterThis')).toEqual(
      'https://www.reddit.com/r/reactjs/new.json?nsfw=0&limit=10&count=0&after=afterThis'
    );
  });

  it('creates a correct URL posts with a subreddit parameter and a before parameter', () => {
    expect(subredditPostsUrl('reactjs', '', 'beforeThis')).toEqual(
      'https://www.reddit.com/r/reactjs/new.json?nsfw=0&limit=10&count=0&before=beforeThis'
    );
  });

  it('creates a correct URL posts with a count parameter', () => {
    expect(subredditPostsUrl('', '', '', 10)).toEqual(
      'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10&count=10'
    );
  });

  it('processes the values in a json response so they can be uses by the Post component, for subreddit post example 1', () => {
    const np = normalizeSubredditPost(postJson1);

    expect(np.title).toEqual('Keto loss so far');
    expect(np.score).toEqual('1');
    expect(np.created).not.toEqual(''); //toEqual('about 2 hours ago');
    expect(np.author).toEqual('mellybbbb');
    expect(np.num_comments).toEqual('0');
    expect(np.text).toEqual(
      'Here are my stats so far! Female/5ft 4inches 5th May- 30th June Weight- 10.13— 9st 10 Bmi- 26.5%— 23.6% Body fat- 34%— 30.6% Sub fat- 30.7%— 28.3% Vis fat- 9— 6 Body water 45.5%— 47.6% Skeletal muscle- 38.5%— 40.4% Muscle mass 6.11 stone— 6.5 stone Bone mass 6lb— 5.6lb Protein 15%— 16.1% BRM 1367— 1300 Metabolic age 33— 30 Fat fee body weight 7st 3lb— 6.10 I have been doing keto and staying under 20g net carbs a day. I excercise 3 times a week and eat between 1000-1200 calories a day and eat between 4-7pm Is there any numbers that are considered too high or too low? I lost 6lb of muscle mass which is upsetting. Any advice appreciated. Thanks!'
    );
    expect(np.thumbnail).toEqual('');
    expect(np.url).toEqual(
      'https://www.reddit.com/r/keto/comments/hj5jk5/keto_loss_so_far/'
    );
    expect(np.link_flair_text).toEqual('');

    // console.log(np);
  });

  it('processes the values in a json response so they can be uses by the Post component, for subreddit post example 2', () => {
    const np = normalizeSubredditPost(postJson2);

    expect(np.title).toEqual('Gambowl on a bed= bad idea');
    expect(np.score).toEqual('1');
    expect(np.created).not.toEqual(''); //toEqual('about 2 hours ago');
    expect(np.author).toEqual('GoldenLegacy96');
    expect(np.num_comments).toEqual('0');
    expect(np.text).toEqual('');
    expect(np.thumbnail).toEqual(
      'https://b.thumbs.redditmedia.com/EcbwH4xXSkZm7Bt3tfYMg0UTknigTWq6H-gRK5S7lHM.jpg'
    );
    expect(np.url).toEqual('https://youtu.be/V3UHoLLOXJQ');
    expect(np.link_flair_text).toEqual('');

    // console.log(np);
  });

  it('processes the values in a json response so they can be uses by the Post component, for subreddit post example 3', () => {
    const np = normalizeSubredditPost(postJson3);

    expect(np.title).toEqual(
      'Cork consultant: Patients already presenting in need of lung transplants after surviving COVID-19'
    );
    expect(np.score).toEqual('5');
    expect(np.created).not.toEqual(''); //toEqual('about 2 hours ago');
    expect(np.author).toEqual('nkrera');
    expect(np.num_comments).toEqual('3');
    expect(np.text).toEqual('');
    expect(np.thumbnail).toEqual(
      'https://b.thumbs.redditmedia.com/PXbwqoKcxSYK07p8Xccghosa3spoM1chmXRLfDheiBk.jpg'
    );
    expect(np.url).toEqual(
      'https://www.echolive.ie/corknews/Cork-consultant-Patients-already-presenting-in-need-of-lung-transplants-after-surviving-Covid-2a3a2602-2c84-408f-a8ad-63a30ccc4b63-ds'
    );
    expect(np.link_flair_text).toEqual('COVID-19');

    // console.log(np);
  });

  it('processes the values in a json response so they can be uses by the Post component, for subreddit post example 4', () => {
    const np = normalizeSubredditPost(postJson4);

    expect(np.link_flair_text).toEqual('Resource');
    expect(np.title).toEqual('React Hook Form V6 is released.');
    expect(np.url).toEqual('https://react-hook-form.com/');
    expect(np.score).toEqual('44');
    expect(np.created).not.toEqual(''); //toEqual('about 2 hours ago');
    expect(np.author).toEqual('bluebill1049');
    expect(np.num_comments).toEqual('27');
    expect(np.text).toEqual('');
    expect(np.thumbnail).toEqual(
      'https://b.thumbs.redditmedia.com/FCAoiBNovM29ojGpWrSqN3puIz5nPN6oFWG-6vKvxBw.jpg'
    );

    // console.log(np);
  });
});
