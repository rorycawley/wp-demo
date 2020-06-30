import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import Loading from '../../src/components/Root/SubredditPosts/Loading';

let documentBody: RenderResult;

describe('<Loading />', () => {
  beforeEach(() => {
    documentBody = render(<Loading />);
  });

  it('shows the loading component on screen', () => {
    expect(
      documentBody.container.getElementsByClassName(
        'MuiSkeleton-root MuiSkeleton-text MuiSkeleton-pulse'
      )
    ).not.toBeNull();

    // screen.debug();
  });
});
