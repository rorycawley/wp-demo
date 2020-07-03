import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  waitFor,
  getByRole,
} from '@testing-library/react';
import ReactDOM from 'react-dom';
import PostList from '../../src/components/Root/PostList';
import { SubredditProvider } from '../../src/components/Root/SubredditContext';

// import API mocking utilities from Mock Service Worker
import { server, rest } from '../utils/setupMSW';
const startupURL =
  'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10&count=0';

let documentBody: RenderResult;

describe('<SubredditSearchBar />', () => {
  beforeEach(() => {
    server.use(
      rest.get(startupURL, (req, res, context) => {
        console.log('great fun altogether');
        return res(
          context.status(200),
          context.json({
            kind: 'Listing',
            data: {
              modhash: '',
              dist: 10,
              children: [],
              after: 't3_hkcn09',
              before: null,
            },
          })
        );
      })
    );

    documentBody = render(
      <SubredditProvider>
        <PostList />
      </SubredditProvider>
    );
  });

  it('shows the SubredditSearchBar has rendered', async () => {
    await waitFor(() => screen.getByTestId('postlist'));

    expect(screen.getByTestId('next')).toBeInTheDocument();
    expect(screen.getByTestId('back')).toBeInTheDocument();

    screen.debug();
  });

  // it('has an input box with the correct id rendered', async () => {
  //   await waitFor(() => screen.getByTestId('postlist'));

  //   const container = document.createElement('div');
  //   ReactDOM.render(
  //     <SubredditProvider>
  //       <SearchBar />
  //     </SubredditProvider>,
  //     container
  //   );
  //   const input = document.getElementById('wp-autocomplete');
  //   expect(input).not.toBeNull();

  //   // not sure what the event should be
  //   fireEvent.change(input!, { subreddit: { value: 'reactjs' } });
  // });
});
