import React from 'react';
// import { Toolbar, AppBar, Typography } from '@material-ui/core';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import RedditIcon from '@material-ui/icons/Reddit';

// const redditOrange = '#ff4500';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     typographyStyles: {
//       flex: 1,
//       fontSize: 20,
//       fontWeight: 500,
//     },
//     iconStyle: {
//       color: `${redditOrange}`,
//     },
//   })
// );
import ErrorFound from '../../ErrorFound';
import useDataAPI from '../../../api/common';
import {
  DEFAULT_POSTS_LIST,
  subredditPostsUrl,
  SubredditPostListData,
  SubredditPostData,
} from '../../../api/reddit';

type SubredditPostsProps = {
  selectedSubreddit: string;
};

const SubredditPosts: React.FC<SubredditPostsProps> = ({
  selectedSubreddit,
}) => {
  // const classes = useStyles();
  console.log('SubredditPosts called');
  try {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
      subredditPostsUrl(selectedSubreddit),
      DEFAULT_POSTS_LIST
    );

    const postData = data as SubredditPostListData;

    return (
      <div>
        {postData.data.children.map(p => (
          <div>p.data.title</div>
        ))}
      </div>
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
    console.error('Error loading data' + error.message);
    return (
      <ErrorFound error="We apologize for the inconvenience but there's been a temporary problem that will be fixed shortly." />
    );
  }
};
export default SubredditPosts;
