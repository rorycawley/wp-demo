// import fetch from "cross-fetch";
import React, { useState } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import {
  DEFAULT_SUBREDDIT,
  DEFAULT_SUBREDDITS_LIST,
} from '../../../api/reddit';
import ErrorFound from '../../ErrorFound';
import { searchSubredditsURL } from '../../../api/reddit';
import { SubredditData, SubredditListData } from '../../../api/reddit';
import useDataAPI from '../../../api/common';

const SubredditSearchBar = () => {
  const [query, setQuery] = useState('');

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
    const subredditsData = data as SubredditListData;
    const options = subredditsData.subreddits.map(
      (subreddit: SubredditData) => subreddit.name
    );
    const loading = (open && options.length === 0) || isLoading;

    // gets called when a key is pressed, obtains a list subreddit matches
    const handleInputChange = (
      _event: object,
      value: string,
      _reason: string
    ) => {
      console.log('search for subreddits that match: ' + value);
      setQuery(value);
      doFetch(searchSubredditsURL(query));
    };

    // this is called once we select a subredding from the list
    const setValue = (selectedSubreddit: string | null) => {
      if (selectedSubreddit) {
        //     setSubredditSearch(selectedSubreddit);
        // TODO do something to pass the value along to the next bit
        console.log('this is the chosen subreddit: ' + selectedSubreddit);
      }
    };
    console.log(options);
    return (
      <Autocomplete
        id='wp-autocomplete'
        onInputChange={handleInputChange}
        onChange={(event: any, newValue: string | null) => {
          newValue ? setQuery(newValue) : setQuery('');
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        loading={loading}
        value={query}
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
    // TODO test this scenario
    // https://dev.to/bil/using-abortcontroller-with-react-hooks-and-typescript-to-cancel-window-fetch-requests-1md4
    // https://dev.to/pallymore/testing-api-request-hooks-with-jest-sinon-and-react-testing-library-3ncf
    console.error('Error loading data' + error.message);
    return <ErrorFound />;
  }
};
export default SubredditSearchBar;
