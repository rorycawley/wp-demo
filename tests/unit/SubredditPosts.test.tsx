import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  waitForElement,
  waitFor,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers, rest, allNewPostsURL, failureURL } from '../utils/handlers';
import { listOfPosts } from '../utils/testData/posts';

import PostList from '../../src/components/Root/PostList';
import { SubredditPost, subredditsFromListData } from '../../src/api/reddit';
import Post from '../../src/components/Root/PostList/Post';
import normalizeSubredditPost from '../../src/api/reddit/normalizeSubredditPost';

const subreddits = subredditsFromListData(listOfPosts);

let documentBody: RenderResult;

describe('<SubredditPosts />', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    documentBody = render(<PostList />);
  });

  it('lists the subreddits out to show it has them', () => {
    subreddits.map(
      (props: unknown) =>
        (documentBody = render(
          <Post {...normalizeSubredditPost(props as SubredditPost)} />
        ))
    );
  });

  it('renders message when posts are fetched successfully', async () => {
    documentBody = render(<PostList />);

    screen.debug();
    // loading
    expect(
      documentBody.container.getElementsByClassName(
        'MuiSkeleton-root MuiSkeleton-text MuiSkeleton-pulse'
      )
    ).not.toBeNull();

    expect(
      await screen.findByText(/Картинки на прозрачном фоне - Авто skoda/i)
    ).toBeInTheDocument();

    screen.debug();
  });

  it('shows that an error has occurred', async () => {
    server.use(
      rest.get(failureURL, (req, res, context) => {
        return res(context.status(400));
      })
    );

    // documentBody = render(<SubredditPosts selectedSubreddit='failure' />);

    // expect(
    //   await waitForElement(() => screen.getByText('Newest posts from'))
    // ).toBeInTheDocument();

    // loading
    expect(
      documentBody.container.getElementsByClassName(
        'MuiSkeleton-root MuiSkeleton-text MuiSkeleton-pulse'
      )
    ).not.toBeNull();

    await waitFor(() =>
      expect(
        documentBody.getByText(
          /We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly./i
        )
      ).toBeInTheDocument()
    );
    // screen.debug();
  });
});
