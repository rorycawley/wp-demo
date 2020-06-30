import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Root from '../../src/components/Root';

let documentBody: RenderResult;

describe('<Root />', () => {
  beforeEach(() => {
    documentBody = render(<Root />);
  });

  it('shows not found message', () => {
    expect(documentBody.getByText('Root')).toBeInTheDocument();

    screen.debug();
  });

  it('runs the first test', () => {
    expect(true).toBe(true);
  });
});
