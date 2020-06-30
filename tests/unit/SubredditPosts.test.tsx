import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import SubredditPosts from '../../src/components/Root/SubredditPosts';

let documentBody: RenderResult;

describe('<SubredditPosts />', () => {
  beforeEach(() => {
    documentBody = render(
      <SubredditPosts selectedSubreddit='test_subreddit' />
    );
  });

  it('shows that SubredditPosts is on screen', () => {
    expect(screen.getByText(/selectedSubreddit/i)).toBeInTheDocument();

    // screen.debug();
  });
});
