import React, { memo } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const Loading = memo(function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </div>
  );
});

export default Loading;
