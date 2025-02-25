import React, { useEffect, useState } from 'react';

import { useSubreddit } from '../SubredditContext';

import normalizeSubredditPost from '../../../api/reddit/normalizeSubredditPost';
import { REDDIT_POSTS_PER_PAGE } from '../../../api/reddit';
import {
  DEFAULT_POSTS_LIST,
  subredditPostsUrl,
  SubredditListOfPostsRaw,
  subredditsFromListData,
} from '../../../api/reddit';
import useDataAPI from '../../../api/common';

import ErrorFound from '../ErrorFound';
import Loading from './Loading';
import PageNav from './PageNav';
import Post from './Post';

import { Typography, Grid, IconButton } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  typographyStyles: {
    flex: 1,
  },
  heading: {
    paddingLeft: '0px',
    paddingTop: '20px',
  },
  post: {
    padding: '24px',
  },
}));

// grid definitions for screen sizes
const xs = 12;
const sm = 6;
const md = 6;
const lg = 4;
const xl = 3;

const PostList: React.FC<{}> = () => {
  try {
    const classes = useStyles();
    const { subreddit, setSubreddit } = useSubreddit()!;
    const [count, setCount] = useState(0);

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
      subredditPostsUrl(subreddit),
      DEFAULT_POSTS_LIST
    );

    const backPage = () => {
      const before = (data as SubredditListOfPostsRaw).data.before;
      doFetch(subredditPostsUrl(subreddit, '', before ? before : '', count));

      setCount(count ? Math.abs(count - REDDIT_POSTS_PER_PAGE) : 0);
      // console.log(count);
    };

    const nextPage = () => {
      const after = (data as SubredditListOfPostsRaw).data.after;
      doFetch(subredditPostsUrl(subreddit, after ? after : '', '', count));
      setCount(count + REDDIT_POSTS_PER_PAGE);

      // console.log(count);
    };

    useEffect(() => {
      // when there's a new subreddit get new posts
      doFetch(subredditPostsUrl(subreddit, '', '', count));
      setCount(0);
    }, [subreddit]);

    if (isError) {
      throw new Error('There was a error while getting the posts data');
    }

    // normalise the posts data
    const posts = subredditsFromListData(
      data as SubredditListOfPostsRaw
    ).map(post => normalizeSubredditPost(post));

    return (
      <>
        <PageNav
          clickNext={nextPage}
          clickBack={backPage}
          nextDisabled={(data as SubredditListOfPostsRaw).data.after === null}
          backDisabled={count <= 0}
        />
        <Typography className={classes.heading}>
          Newest posts from
          <strong> /r/{subreddit ? subreddit : 'all'}</strong>
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Grid
            container
            spacing={2}
            className={classes.post}
            data-testid='postlist'
          >
            {posts.map(post => (
              <Grid
                key={post.name}
                item
                xs={xs}
                sm={sm}
                md={md}
                lg={lg}
                xl={xl}
              >
                <Post {...post} />
              </Grid>
            ))}
            <PageNav
              clickNext={nextPage}
              clickBack={backPage}
              nextDisabled={
                (data as SubredditListOfPostsRaw).data.after === null
              }
              backDisabled={count <= 0}
            />{' '}
          </Grid>
        )}
      </>
    );
  } catch (error) {
    return (
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  }
};
export default PostList;
