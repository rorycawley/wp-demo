import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/react';

import SearchBar from '../../src/components/Root/SearchBar';

let documentBody: RenderResult;

describe('<SubredditSearchBar />', () => {
  beforeEach(() => {
    documentBody = render(<SearchBar />);
  });

  it('shows the SubredditSearchBar has rendered', () => {
    // expect(documentBody.getByText(/Search/)).toBeInTheDocument();
    // expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // screen.debug();
  });
});
