import React from 'react';
import { Toolbar, AppBar, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import RedditIcon from '@material-ui/icons/Reddit';

const redditOrange = '#ff4500';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typographyStyles: {
      flex: 1,
      fontSize: 20,
      fontWeight: 500,
    },
    iconStyle: {
      color: `${redditOrange}`,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          WP Reddit Demo
        </Typography>
        <RedditIcon className={classes.iconStyle} />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
