import React from 'react';
import {
  CssBaseline,
  makeStyles,
  ThemeProvider,
  Grid,
} from '@material-ui/core';

import theme from '../../ui/theme';
import Header from './Header';
import SubredditSearchBar from './SubredditSearchBar';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  typographyStyles: {
    flex: 1,
  },
  heading: {
    paddingLeft: '24px',
    paddingTop: '20px',
  },
}));

const Root: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container id='Root' direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8} className={classes.content}>
            <SubredditSearchBar />
            <hr />
            "Content"
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item>this is where the footer will be</Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Root;

/*
import React, { useState, useEffect, createContext, useReducer } from 'react';
// import StateContext from '../../helpers/StateContext';

import {
  CssBaseline,
  makeStyles,
  ThemeProvider,
  Grid,
} from '@material-ui/core';

import Header from './Header';
import theme from '../../ui/theme';
import Content from './Content';
import SelectSubreddit from './SelectSubreddit';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  typographyStyles: {
    flex: 1,
  },
  heading: {
    paddingLeft: '24px',
    paddingTop: '20px',
  },
}));

//pantheon.io/blog/typescript-wordpress-basics
interface SubredditPost {
  title: string;
  link_flair_text: string;
  likes: string | null;
  id: string;
}

interface SubredditPostData {
  kind: string;
  data: SubredditPost;
}
interface SubredditPostsData {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: Array<SubredditPostData>;
  };
}

// const SubredditPost = ({
//   title,
//   link_flair_text,
//   likes,
//   id,
// }: {
//   subredditPost: SubredditPost;
// }) => <div>{title}</div>;

// const ListOfSubredditPosts = ({
//   subredditPosts,
// }: {
//   subredditPosts: SubredditPostsData;
// }) =>
//   subredditPosts.children.map((subredditPost) => (
//     <SubredditPost subredditPostData={data.subredditPost} />
//   ));

const Root = () => {
  const classes = useStyles();
  const subredditSearch = { name: '' };
  const posts: SubredditPostData[] = [];

  return <SelectSubreddit />;
  // return (
  //   <ThemeProvider theme={theme}>
  //     <CssBaseline />
  //     <Grid container direction='column'>
  //       <Grid item>
  //         <Header />
  //       </Grid>
  //       <Grid item container>
  //         <Grid item xs={false} sm={2} />
  //         <Grid item xs={12} sm={8} className={classes.content}>
  //           <SelectSubreddit />
  //           <Content subredditSearch={subredditSearch} posts={posts} />
  //         </Grid>
  //         <Grid item xs={false} sm={2} />
  //       </Grid>
  //       <Grid item>this is where the footer will be</Grid>
  //     </Grid>
  //   </ThemeProvider>
  // );
};

export default Root;
*/
