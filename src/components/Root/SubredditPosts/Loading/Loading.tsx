import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const Loading: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </div>
  );
};
export default Loading;
