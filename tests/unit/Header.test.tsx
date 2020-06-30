import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Header from '../../src/components/Root/Header';

let documentBody: RenderResult;

describe('<Header />', () => {
  beforeEach(() => {
    documentBody = render(<Header />);
  });

  it('shows the header message', () => {
    expect(documentBody.getByText('WP Reddit Demo')).toBeInTheDocument();
    //screen.debug();
  });
});
