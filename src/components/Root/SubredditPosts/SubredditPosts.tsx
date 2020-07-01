import React, { useEffect } from 'react';

import { useSubreddit } from '../SubredditContext';

import ErrorFound from '../ErrorFound';
import Loading from './Loading';
import useDataAPI from '../../../api/common';

import {
  DEFAULT_POSTS_LIST,
  SubredditPostData,
  SubredditPostListData,
  subredditPostsUrl,
} from '../../../api/reddit';
import { Typography, Grid } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import Post from './Post';

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

const xs = 12;
const sm = 6;
const md = 6;
const lg = 4;
const xl = 3;

const SubredditPosts: React.FC<{}> = () => {
  const classes = useStyles();
  const { subreddit, setSubreddit } = useSubreddit()!;
  try {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
      subredditPostsUrl(subreddit),
      DEFAULT_POSTS_LIST
    );

    useEffect(() => {
      // when there's a new subreddit get new posts
      doFetch(subredditPostsUrl(subreddit));
    }, [subreddit]);

    // const classes = useStyles();

    if (isError) {
      throw new Error('There was a error while getting the posts data');
    }

    // turn the data into a list of posts
    const posts: SubredditPostData[] = (data as SubredditPostListData).data
      .children;

    // console.log(posts.map(p => p.data.title));
    return (
      <>
        <Typography className={classes.heading}>
          Newest posts from
          <strong> /r/{subreddit ? subreddit : 'all'}</strong>
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Grid container spacing={2} className={classes.post}>
            {/* <Post post={posts[0]} /> */}
              <div>placeholder</div>
            {/* posts.map(({data}) => (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Post post={data} />
            </Grid>
            )) */}
          </Grid>
        )}
      </>
    );
    // return (
    //   <>
    //     {isLoading ? (
    //       <div>Loading...</div>
    //     ) : (
    //       // <ListOfSubredditPosts subredditPostsData={postData.data.children} />
    //       {postData.data.children.map(post: SubredditPostData => <div>{post}</div>)}
    //     )}
    //   </>
    // );
  } catch (error) {
    // TODO test this scenario
    // https://dev.to/bil/using-abortcontroller-with-react-hooks-and-typescript-to-cancel-window-fetch-requests-1md4
    // https://dev.to/pallymore/testing-api-request-hooks-with-jest-sinon-and-react-testing-library-3ncf
    // console.error('Error loading data' + error.message);
    return (
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  }
};
export default SubredditPosts;
