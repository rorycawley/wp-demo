import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import ErrorFound from '../../src/components/ErrorFound';

let documentBody: RenderResult;

describe('<ErrorFound />', () => {
  beforeEach(() => {
    documentBody = render(
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  });

  it('shows not found error message', () => {
    expect(
      documentBody.getByText(
        "We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly."
      )
    ).toBeInTheDocument();

    // screen.debug();
  });

  // TODO: test when there is a network problem, ensure error shows up
});
