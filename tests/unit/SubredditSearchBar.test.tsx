import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/react';

import SubredditSearchBar from '../../src/components/Root/SubredditSearchBar';

let documentBody: RenderResult;

describe('<SubredditSearchBar />', () => {
  beforeEach(() => {
    documentBody = render(<SubredditSearchBar />);
  });

  it('shows the SubredditSearchBar has rendered', () => {
    // expect(documentBody.getByText(/Search/)).toBeInTheDocument();
    // expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // screen.debug();
  });
});
