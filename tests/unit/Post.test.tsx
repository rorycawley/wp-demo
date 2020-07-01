import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import normalizeSubredditPost from '../../src/api/reddit/normalizeSubredditPost';

import Post from '../../src/components/Root/SubredditPosts/Post';
import {postJson1,postJson2,postJson3,postJson4} from '../testData/posts'


let documentBody: RenderResult;

describe('<Post />', () => {
  beforeEach(() => {
    const props = (documentBody = render(
      <Post {...normalizeSubredditPost(postJson1)} />
    ));
  });

  it('shows the Post component title on screen', () => {
    expect(screen.getByText(/Keto loss so far/i)).toBeInTheDocument();

    // screen.debug();
  });

  it('shows the Post component created on screen', () => {
    // screen.debug();
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  it('shows the Post component score on screen', () => {
    // screen.debug();
    expect(screen.getByText(/Score is 1/i)).toBeInTheDocument();
  });

  it('shows the Post component author on screen', () => {
    // screen.debug();
    expect(screen.getByText(/mellybbbb/i)).toBeInTheDocument();
  });

  it('shows the Post component num comments on screen', () => {
    // screen.debug();
    expect(screen.getByText(/number of commments is 0/i)).toBeInTheDocument();
  });

  it('shows the Post component text on screen', () => {
    // screen.debug();
    expect(screen.getByText(/5ft 4inches/i)).toBeInTheDocument();
  });

  it.only('shows the Post component thumbnail on screen', () => {
    // screen.debug();
    expect(screen.getByText(/5ft 4inches/i)).toBeInTheDocument();
  });
  it('shows the Post component url on screen', () => {
    // screen.debug();
    expect(screen.getByText(/this is the url/i)).toBeInTheDocument();
  });
  it('shows the Post component link_flair_text on screen', () => {
    // screen.debug();
    expect(screen.getByText(/link_flair_text is/i)).toBeInTheDocument();
  });
});
