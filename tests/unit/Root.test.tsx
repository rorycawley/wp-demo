import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Root from '../../src/components/Root';

let documentBody: RenderResult;

describe('<Root />', () => {
  beforeEach(() => {
    documentBody = render(<Root />);
  });

  it('shows to root', () => {
    expect(screen.getByText(/WP Reddit Demo/i)).toBeInTheDocument();

    // screen.debug();
  });
});
