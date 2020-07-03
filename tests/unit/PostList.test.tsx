import React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  waitFor,
  getByRole,
} from '@testing-library/react';
import ReactDOM from 'react-dom';
import PostList from '../../src/components/Root/PostList';
import { SubredditProvider } from '../../src/components/Root/SubredditContext';

// import API mocking utilities from Mock Service Worker
import { server, rest } from '../utils/setupMSW';
const startupURL =
  'https://www.reddit.com/r/all/new.json?nsfw=0&limit=10&count=0';

let documentBody: RenderResult;

describe('<PostList />', () => {
  beforeEach(() => {});

  it('shows the PostList has rendered', async () => {
    server.use(
      rest.get(startupURL, (req, res, context) => {
        console.log(`response to ${startupURL}`);
        return res(
          context.status(200),
          context.json({
            kind: 'Listing',
            data: {
              modhash: '',
              dist: 10,
              children: [],
              after: 't3_hkcn09',
              before: null,
            },
          })
        );
      })
    );

    documentBody = render(
      <SubredditProvider>
        <PostList />
      </SubredditProvider>
    );

    await waitFor(() => screen.getByTestId('postlist'));

    expect(screen.getByTestId('postlist')).toBeInTheDocument();

    // screen.debug();
  });

  it('shows the PostList navigation has rendered', async () => {
    server.use(
      rest.get(startupURL, (req, res, context) => {
        console.log(`response to ${startupURL}`);
        return res(
          context.status(200),
          context.json({
            kind: 'Listing',
            data: {
              modhash: '',
              dist: 10,
              children: [],
              after: 't3_hkcn09',
              before: null,
            },
          })
        );
      })
    );

    documentBody = render(
      <SubredditProvider>
        <PostList />
      </SubredditProvider>
    );

    await waitFor(() => screen.getByTestId('postlist'));

    expect(screen.getByLabelText('next')).toBeInTheDocument();
    expect(screen.getByLabelText('back')).toBeInTheDocument();

    // screen.debug();
  });

  it('shows the PostList has rendered with 2 sample posts', async () => {
    server.use(
      rest.get(startupURL, (req, res, context) => {
        console.log(`response to ${startupURL}`);
        return res(
          context.status(200),
          context.json({
            kind: 'Listing',
            data: {
              modhash: '',
              dist: 2,
              children: [
                {
                  kind: 't3',
                  data: {
                    approved_at_utc: null,
                    subreddit: 'reactjs',
                    selftext:
                      'Hello, \nI already learn React Redux REST Api Node Express MongoDB. I use create react app for my project. Now i also want to learn Gatsbyjs. Can you please describe me, how can i learn Gatsbyjs? What else i also need to learn? \n\nCan you please told me, what is deference between nextjs and Gatsbyjs also??\n\nThank You.',
                    author_fullname: 't2_b2y4aul',
                    saved: false,
                    mod_reason_title: null,
                    gilded: 0,
                    clicked: false,
                    title: 'Need some info..',
                    link_flair_richtext: [],
                    subreddit_name_prefixed: 'r/reactjs',
                    hidden: false,
                    pwls: 6,
                    link_flair_css_class: 'link-flair-needs-help',
                    downs: 0,
                    thumbnail_height: null,
                    top_awarded_type: null,
                    hide_score: true,
                    name: 't3_hkfum2',
                    quarantine: false,
                    link_flair_text_color: 'light',
                    upvote_ratio: 1.0,
                    author_flair_background_color: null,
                    subreddit_type: 'public',
                    ups: 1,
                    total_awards_received: 0,
                    media_embed: {},
                    thumbnail_width: null,
                    author_flair_template_id: null,
                    is_original_content: false,
                    user_reports: [],
                    secure_media: null,
                    is_reddit_media_domain: false,
                    is_meta: false,
                    category: null,
                    secure_media_embed: {},
                    link_flair_text: 'Needs Help',
                    can_mod_post: false,
                    score: 1,
                    approved_by: null,
                    author_premium: false,
                    thumbnail: 'self',
                    edited: false,
                    author_flair_css_class: null,
                    author_flair_richtext: [],
                    gildings: {},
                    content_categories: null,
                    is_self: true,
                    mod_note: null,
                    created: 1593796264.0,
                    link_flair_type: 'text',
                    wls: 6,
                    removed_by_category: null,
                    banned_by: null,
                    author_flair_type: 'text',
                    domain: 'self.reactjs',
                    allow_live_comments: false,
                    selftext_html:
                      '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Hello, \nI already learn React Redux REST Api Node Express MongoDB. I use create react app for my project. Now i also want to learn Gatsbyjs. Can you please describe me, how can i learn Gatsbyjs? What else i also need to learn? &lt;/p&gt;\n\n&lt;p&gt;Can you please told me, what is deference between nextjs and Gatsbyjs also??&lt;/p&gt;\n\n&lt;p&gt;Thank You.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;',
                    likes: null,
                    suggested_sort: 'confidence',
                    banned_at_utc: null,
                    view_count: null,
                    archived: false,
                    no_follow: true,
                    is_crosspostable: false,
                    pinned: false,
                    over_18: false,
                    all_awardings: [],
                    awarders: [],
                    media_only: false,
                    link_flair_template_id:
                      'c808a3ce-8520-11e8-b3d4-0e03aa55af0c',
                    can_gild: false,
                    spoiler: false,
                    locked: false,
                    author_flair_text: null,
                    treatment_tags: [],
                    visited: false,
                    removed_by: null,
                    num_reports: null,
                    distinguished: null,
                    subreddit_id: 't5_2zldd',
                    mod_reason_by: null,
                    removal_reason: null,
                    link_flair_background_color: '#b8001f',
                    id: 'hkfum2',
                    is_robot_indexable: true,
                    report_reasons: null,
                    author: 'rupam71',
                    discussion_type: null,
                    num_comments: 1,
                    send_replies: true,
                    whitelist_status: 'all_ads',
                    contest_mode: false,
                    mod_reports: [],
                    author_patreon_flair: false,
                    author_flair_text_color: null,
                    permalink: '/r/reactjs/comments/hkfum2/need_some_info/',
                    parent_whitelist_status: 'all_ads',
                    stickied: false,
                    url:
                      'https://www.reddit.com/r/reactjs/comments/hkfum2/need_some_info/',
                    subreddit_subscribers: 197612,
                    created_utc: 1593767464.0,
                    num_crossposts: 0,
                    media: null,
                    is_video: false,
                  },
                },
                {
                  kind: 't3',
                  data: {
                    approved_at_utc: null,
                    subreddit: 'reactjs',
                    selftext:
                      'Beginner here. I’ve only used gatsby so far, and with gatsby you’re always waiting for the rebuild for the changes to be reflected. \n\n- If I used create-react-app or some other ssr framework with react, would changes the user makes very visible straightaway in the live site?',
                    author_fullname: 't2_15ps6o',
                    saved: false,
                    mod_reason_title: null,
                    gilded: 0,
                    clicked: false,
                    title:
                      'Will changes made in a headless CMS be directly visible in my live react site?',
                    link_flair_richtext: [],
                    subreddit_name_prefixed: 'r/reactjs',
                    hidden: false,
                    pwls: 6,
                    link_flair_css_class: 'link-flair-needs-help',
                    downs: 0,
                    thumbnail_height: null,
                    top_awarded_type: null,
                    hide_score: true,
                    name: 't3_hkf9b3',
                    quarantine: false,
                    link_flair_text_color: 'light',
                    upvote_ratio: 1.0,
                    author_flair_background_color: null,
                    subreddit_type: 'public',
                    ups: 2,
                    total_awards_received: 0,
                    media_embed: {},
                    thumbnail_width: null,
                    author_flair_template_id: null,
                    is_original_content: false,
                    user_reports: [],
                    secure_media: null,
                    is_reddit_media_domain: false,
                    is_meta: false,
                    category: null,
                    secure_media_embed: {},
                    link_flair_text: 'Needs Help',
                    can_mod_post: false,
                    score: 2,
                    approved_by: null,
                    author_premium: false,
                    thumbnail: 'self',
                    edited: 1593764567.0,
                    author_flair_css_class: null,
                    author_flair_richtext: [],
                    gildings: {},
                    content_categories: null,
                    is_self: true,
                    mod_note: null,
                    created: 1593792870.0,
                    link_flair_type: 'text',
                    wls: 6,
                    removed_by_category: null,
                    banned_by: null,
                    author_flair_type: 'text',
                    domain: 'self.reactjs',
                    allow_live_comments: false,
                    selftext_html:
                      '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;Beginner here. I’ve only used gatsby so far, and with gatsby you’re always waiting for the rebuild for the changes to be reflected. &lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;If I used create-react-app or some other ssr framework with react, would changes the user makes very visible straightaway in the live site?&lt;/li&gt;\n&lt;/ul&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;',
                    likes: null,
                    suggested_sort: 'confidence',
                    banned_at_utc: null,
                    view_count: null,
                    archived: false,
                    no_follow: true,
                    is_crosspostable: false,
                    pinned: false,
                    over_18: false,
                    all_awardings: [],
                    awarders: [],
                    media_only: false,
                    link_flair_template_id:
                      'c808a3ce-8520-11e8-b3d4-0e03aa55af0c',
                    can_gild: false,
                    spoiler: false,
                    locked: false,
                    author_flair_text: null,
                    treatment_tags: [],
                    visited: false,
                    removed_by: null,
                    num_reports: null,
                    distinguished: null,
                    subreddit_id: 't5_2zldd',
                    mod_reason_by: null,
                    removal_reason: null,
                    link_flair_background_color: '#b8001f',
                    id: 'hkf9b3',
                    is_robot_indexable: true,
                    report_reasons: null,
                    author: 'dcde',
                    discussion_type: null,
                    num_comments: 2,
                    send_replies: true,
                    whitelist_status: 'all_ads',
                    contest_mode: false,
                    mod_reports: [],
                    author_patreon_flair: false,
                    author_flair_text_color: null,
                    permalink:
                      '/r/reactjs/comments/hkf9b3/will_changes_made_in_a_headless_cms_be_directly/',
                    parent_whitelist_status: 'all_ads',
                    stickied: false,
                    url:
                      'https://www.reddit.com/r/reactjs/comments/hkf9b3/will_changes_made_in_a_headless_cms_be_directly/',
                    subreddit_subscribers: 197612,
                    created_utc: 1593764070.0,
                    num_crossposts: 0,
                    media: null,
                    is_video: false,
                  },
                },
              ],
              after: 't3_hkf9b3',
              before: null,
            },
          })
        );
      })
    );

    documentBody = render(
      <SubredditProvider>
        <PostList />
      </SubredditProvider>
    );

    await waitFor(() => screen.getByTestId('postlist'));

    expect(screen.getByTestId('postlist')).toBeInTheDocument();

    // check that the two posts have rendered on screen
    expect(screen.getByText(/Beginner here/i)).toBeInTheDocument();

    expect(screen.getByText(/I already learn React/i)).toBeInTheDocument();

    // screen.debug();
  });
});
