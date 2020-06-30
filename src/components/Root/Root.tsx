import React, { useState } from 'react';
import {
  CssBaseline,
  makeStyles,
  ThemeProvider,
  Grid,
  Typography,
} from '@material-ui/core';

import theme from '../../ui/theme';
import Header from './Header';
import SubredditSearchBar from './SubredditSearchBar';
import SubredditPosts from './SubredditPosts';
import { subredditPostsUrl } from '../../api/reddit';

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
}));

const Root: React.FC<{}> = () => {
  const classes = useStyles();
  const [selectedSubreddit, setSelectedSubreddit] = useState('');

  const handleSubredditChange = (subreddit: string) => {
    setSelectedSubreddit(subreddit);

    // fetch the posts of the newly selected subreddit
    //doFetch(subredditPostsUrl(selectedSubreddit));
  };
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
            <SubredditSearchBar setSelectedSubreddit={handleSubredditChange} />
            <Typography className={classes.heading}>
              Newest posts from
              <strong>
                /r/{selectedSubreddit ? selectedSubreddit : 'all'}
              </strong>
            </Typography>
            "Content"
            {selectedSubreddit}
            <SubredditPosts selectedSubreddit={selectedSubreddit} />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
        <Grid item>this is where the footer will be</Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Root;
