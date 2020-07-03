import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PageNav: React.FC<{
  backDisabled: boolean;
  nextDisabled: boolean;
  clickBack: () => void;
  clickNext: () => void;
}> = ({ backDisabled, nextDisabled, clickBack, clickNext }) => {
  return (
    <Grid
      data-testid='pagenav'
      container
      spacing={2}
      alignContent='space-around'
      justify='center'
    >
      <IconButton
        aria-label='back'
        disabled={backDisabled}
        color='default'
        onClick={() => clickBack()}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        color='default'
        disabled={nextDisabled}
        aria-label='next'
        onClick={() => clickNext()}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Grid>
  );
};

export default PageNav;
