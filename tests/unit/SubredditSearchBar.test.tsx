import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import SubredditSearchBar from '../../src/components/Root/SubredditSearchBar';

let documentBody: RenderResult;

describe('<SubredditSearchBar />', () => {
  beforeEach(() => {
    documentBody = render(<SubredditSearchBar />);
  });

  it('shows the SubredditSearchBar has rendered', () => {
    expect(
      documentBody.getByPlaceholderText('Search for subreddits...')
    ).toBeInTheDocument();

    // screen.debug();
  });
});
