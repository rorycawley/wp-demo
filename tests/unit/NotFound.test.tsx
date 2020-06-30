import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Root from '../../src/components/NotFound';

let documentBody: RenderResult;

describe('<NotFound />', () => {
  beforeEach(() => {
    documentBody = render(<Root />);
  });

  it('shows not found error message', () => {
    expect(
      documentBody.getByText(
        "We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly."
      )
    ).toBeInTheDocument();

    // screen.debug();
  });
});
