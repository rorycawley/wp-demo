import React from 'react';

import ErrorFound from '../../ErrorFound';
import Loading from './Loading';
import useDataAPI from '../../../api/common';
import {
  DEFAULT_POSTS_LIST,
  subredditPostsUrl,
  SubredditPostListData,
  SubredditPostData,
} from '../../../api/reddit';

type SubredditPostsProps = {
  selectedSubreddit?: string;
};

const SubredditPosts: React.FC<SubredditPostsProps> = ({
  selectedSubreddit,
}) => {
  // const classes = useStyles();
  console.log('SubredditPosts called: ' + subredditPostsUrl(selectedSubreddit));
  try {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
      subredditPostsUrl(selectedSubreddit),
      DEFAULT_POSTS_LIST
    );

    if (isError) {
      throw new Error('There was a error while getting the posts data');
    }

    const postData = data as SubredditPostListData;
    const posts: SubredditPostData[] = postData.data.children;
    console.log(posts.map(p => p.data.title));
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          postData.data.children.map(p => (
            <div key={p.data.name}>{p.data.title}</div>
          ))
        )}
      </>
    );
    // return (
    //   <>
    //     {isLoading ? (
    //       <div>Loading...</div>
    //     ) : (
    //       // <ListOfSubredditPosts subredditPostsData={postData.data.children} />
    //       {postData.data.children.map(post: SubredditPostData => <div>{post}</div>)}
    //     )}
    //   </>
    // );
  } catch (error) {
    // TODO test this scenario
    // https://dev.to/bil/using-abortcontroller-with-react-hooks-and-typescript-to-cancel-window-fetch-requests-1md4
    // https://dev.to/pallymore/testing-api-request-hooks-with-jest-sinon-and-react-testing-library-3ncf
    // console.error('Error loading data' + error.message);
    return (
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  }
};
export default SubredditPosts;
