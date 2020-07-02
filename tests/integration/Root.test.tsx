import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  waitForElement,
  waitFor,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers, rest, allNewPostsURL, failureURL } from '../common/handlers';

import Root from '../../src/components/Root';

let documentBody: RenderResult;

describe('<Root />', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  beforeEach(() => {
    documentBody = render(<Root />);
  });

  it('shows to root', () => {
    expect(screen.getByText(/WP Reddit Demo/i)).toBeInTheDocument();

    // screen.debug();
  });

  it('shows the list of subreddit posts, once loaded', async () => {
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
});
