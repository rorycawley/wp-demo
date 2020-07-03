import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import ReactDOM from 'react-dom';
import SearchBar from '../../src/components/Root/SearchBar';
import { SubredditProvider } from '../../src/components/Root/SubredditContext';

// import API mocking utilities from Mock Service Worker
import { server, rest } from '../utils/setupMSW';
const startupURL =
  'https://www.reddit.com/api/subreddit_autocomplete.json?query=&include_over_18=0&include_profiles=0';

let documentBody: RenderResult;

describe('<SubredditSearchBar />', () => {
  beforeEach(() => {
    server.use(
      rest.get(startupURL, (req, res, context) => {
        // console.log('great fun altogether');
        return res(
          context.status(200),
          context.json({
            subreddits: [],
          })
        );
      })
    );

    documentBody = render(
      <SubredditProvider>
        <SearchBar />
      </SubredditProvider>
    );
  });

  it('shows the SubredditSearchBar has rendered', async () => {
    await waitFor(() => screen.getByTestId('searchbar'));

    expect(screen.getByTestId('searchbar')).toBeInTheDocument();

    screen.debug();
  });

  it('has an input box with the correct id rendered', async () => {
    await waitFor(() => screen.getByTestId('searchbar'));

    const container = document.createElement('div');
    ReactDOM.render(
      <SubredditProvider>
        <SearchBar />
      </SubredditProvider>,
      container
    );
    const input = document.getElementById('wp-autocomplete');
    expect(input).not.toBeNull();

    // not sure what the event should be
    fireEvent.change(input!, { subreddit: { value: 'reactjs' } });
  });
});
