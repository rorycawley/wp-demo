import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Loading from '../../src/components/Root/PostList/Loading';

let documentBody: RenderResult;

describe('<Loading />', () => {
  beforeEach(() => {});

  it('renders the component', () => {
    documentBody = render(<Loading />);

    expect(
      documentBody.container.getElementsByClassName(
        'MuiSkeleton-root MuiSkeleton-text MuiSkeleton-pulse'
      )
    ).not.toBeNull();
    // screen.debug();
  });
});
