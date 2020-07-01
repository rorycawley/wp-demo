import React, { useState, useContext, createContext } from 'react';
import {
  CssBaseline,
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core';

import Header from './Header';
import theme from '../../ui/theme';
import SubredditPosts from './SubredditPosts';
import SubredditSearchBar from './SubredditSearchBar';
import { subredditPostsUrl } from '../../api/reddit';

import { SubredditProvider, useSubreddit } from './SubredditContext';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  typographyStyles: {
    flex: 1,
  },
}));

const Root: React.FC<{}> = () => {
  const classes = useStyles();
  // const [selectedSubreddit, setSelectedSubreddit] = useState('');
  const newSubreddit = useSubreddit();

  // const handleSubredditChange = (subreddit: string) => {
  //   setSelectedSubreddit(subreddit);

  // TODO: this must be added in order to get the updated posts
  // fetch the posts of the newly selected subreddit
  //doFetch(subredditPostsUrl(selectedSubreddit));
  // };

  return (
    <SubredditProvider>
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

              <SubredditPosts />
            </Grid>
            <Grid item xs={false} sm={2} />
          </Grid>
          <Grid item>this is where the footer will be</Grid>
        </Grid>
      </ThemeProvider>
    </SubredditProvider>
  );
};

export default Root;
