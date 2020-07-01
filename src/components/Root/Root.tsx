import React from 'react';
import {
  CssBaseline,
  Grid,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';

import Header from './Header';
import theme from '../../ui/theme';
import SubredditPosts from './SubredditPosts';
import SubredditSearchBar from './SubredditSearchBar';

import { SubredditProvider, useSubreddit } from './SubredditContext';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '24px',
  },
  typographyStyles: {
    flex: 1,
  },
}));

// No state on Root but context state from SubredditProvider is injected
// SubredditSearchBar updates the context state when a different subreddit is selected
// SubredditPosts updated when the subreddit is changed in the context state
const Root: React.FC<{}> = () => {
  const classes = useStyles();

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
        </Grid>
      </ThemeProvider>
    </SubredditProvider>
  );
};

export default Root;
