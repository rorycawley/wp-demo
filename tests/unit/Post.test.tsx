import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import normalizeSubredditPost from '../../src/api/reddit/normalizeSubredditPost';

import Post from '../../src/components/Root/PostList/Post';
import {
  postJson1,
  postJson2,
  postJson3,
  postJson4,
} from '../utils/testData/posts';

let documentBody: RenderResult;

describe('<Post />', () => {
  describe('<Post /> post example 1', () => {
    beforeEach(() => {
      const props = (documentBody = render(
        <Post {...normalizeSubredditPost(postJson1)} />
      ));
    });

    it('shows the Post  title on screen', () => {
      expect(screen.getByText(/Keto loss so far/i)).toBeInTheDocument();

      // screen.debug();
    });

    it('shows the Post  created information on screen', () => {
      // screen.debug();
      expect(screen.getByText(/ago/i)).toBeInTheDocument();
    });

    it('shows the Post component author on screen', () => {
      // screen.debug();
      expect(screen.getByText(/mellybbbb/i)).toBeInTheDocument();
    });

    it('shows the Post component text on screen', () => {
      // screen.debug();
      expect(screen.getByText(/5ft 4inches/i)).toBeInTheDocument();
    });
  });

  describe('<Post /> post example 2', () => {
    beforeEach(() => {
      const props = (documentBody = render(
        <Post {...normalizeSubredditPost(postJson2)} />
      ));
    });

    it('shows the Post  title on screen', () => {
      expect(
        screen.getByText(/Gambowl on a bed= bad idea/i)
      ).toBeInTheDocument();

      // screen.debug();
    });

    it('shows the Post  thumbnail information on screen', () => {
      // screen.debug();
      expect(documentBody.container.innerHTML).toMatch(
        'https://b.thumbs.redditmedia.com/EcbwH4xXSkZm7Bt3tfYMg0UTknigTWq6H-gRK5S7lHM.jpg'
      );
    });

    it('shows the Post  created information on screen', () => {
      // screen.debug();
      expect(screen.getByText(/ago/i)).toBeInTheDocument();
    });

    it('shows the Post component author on screen', () => {
      // screen.debug();
      expect(screen.getByText(/GoldenLegacy96/i)).toBeInTheDocument();
    });
  });

  describe('<Post /> post example 3', () => {
    beforeEach(() => {
      const props = (documentBody = render(
        <Post {...normalizeSubredditPost(postJson3)} />
      ));
    });

    it('shows the Post  title on screen', () => {
      expect(screen.getByText(/Cork consultant/i)).toBeInTheDocument();

      // screen.debug();
    });

    it('shows the Post  created information on screen', () => {
      // screen.debug();
      expect(screen.getByText(/ago/i)).toBeInTheDocument();
    });

    it('shows the Post component author on screen', () => {
      // screen.debug();
      expect(screen.getByText(/nkrera/i)).toBeInTheDocument();
    });
  });

  describe('<Post /> post example 4', () => {
    beforeEach(() => {
      const props = (documentBody = render(
        <Post {...normalizeSubredditPost(postJson4)} />
      ));
    });

    it('shows the Post  title on screen', () => {
      expect(
        screen.getByText(/React Hook Form V6 is released./i)
      ).toBeInTheDocument();

      // screen.debug();
    });

    it('shows the Post  created information on screen', () => {
      // screen.debug();
      expect(screen.getByText(/ago/i)).toBeInTheDocument();
    });

    it('shows the Post component author on screen', () => {
      // screen.debug();
      expect(screen.getByText(/bluebill1049/i)).toBeInTheDocument();
    });
  });
});
