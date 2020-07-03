import React, { useState, useEffect } from 'react';

import { useSubreddit } from '../SubredditContext';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {
  DEFAULT_SUBREDDIT,
  DEFAULT_SUBREDDITS_LIST,
} from '../../../api/reddit';

import ErrorFound from '../ErrorFound';
import { searchSubredditsURL } from '../../../api/reddit';
import { SubredditData, SubredditListData } from '../../../api/reddit';
import useDataAPI from '../../../api/common';
import useDebounce from '../../../api/common/useDebounce';

const getSubredditNames = (subreddits: SubredditData[]) =>
  subreddits.map(subreddit => subreddit.name);

const useStyles = makeStyles(theme => ({
  searchBar: {
    paddingLeft: '35px',
    paddingRight: '35px',
    paddingBottom: '10px',
  },
}));

const SearchBar: React.FC<{}> = () => {
  const classes = useStyles();
  const { subreddit, setSubreddit } = useSubreddit()!;
  const [searchQuery, setSearchQuery] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataAPI(
    searchSubredditsURL(DEFAULT_SUBREDDIT),
    DEFAULT_SUBREDDITS_LIST
  );
  const [open, setOpen] = useState(false);

  try {
    if (isError) {
      throw new Error('Error occurred during search');
    }

    // turn the data into a list that the autocomplete dropdown can consume
    const subreddits = (data as SubredditListData).subreddits;
    const dropdownSubreddits: string[] = getSubredditNames(subreddits);

    const loading = (open && dropdownSubreddits.length === 0) || isLoading;

    // keypress handler
    const handleInputChange = (
      _event: object,
      typedInSubreddit: string,
      _reason: string
    ) => {
      setSearchQuery(typedInSubreddit);

      // find a list of subreddits that match what we've typed
      // doFetch(searchSubredditsURL(typedInSubreddit));
    };

    // select a subreddit
    const handleSelectedSubreddit = (
      _event: any,
      selectedSubreddit: string | null
    ) => {
      if (selectedSubreddit) {
        setSubreddit(selectedSubreddit);
        setSearchQuery(selectedSubreddit);
      }
    };

    // Allow the API to be called only when the user stops typing
    const debouncedSearchTerm = useDebounce(searchQuery, 300);
    useEffect(() => {
      doFetch(searchSubredditsURL(debouncedSearchTerm));
    }, [debouncedSearchTerm]);

    return (
      <Autocomplete
        id='wp-autocomplete'
        data-testid='searchbar'
        className={classes.searchBar}
        onInputChange={handleInputChange}
        onChange={handleSelectedSubreddit}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={dropdownSubreddits}
        loading={loading}
        value={searchQuery}
        clearOnBlur
        renderInput={params => (
          <TextField
            {...params}
            label='Search for subreddits...'
            fullWidth
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  } catch (error) {
    return (
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  }
};
export default SearchBar;
