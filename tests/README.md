# Unit Tests

## ErrorFound ☑️

1. renders without a provided error parameter
2. renders the component with an error message

## Header ☑️

1. renders the component

## Loading ☑️

1. renders the component

## Post

1. Render component on screen with title, created and text.
2. Render component on screen with title, created and thumbnail.
3. Render component on screen with title, created, text and thumbnail.
4. Render component on screen without any props.

## useDataApi

1. check our mock server worker is setup with a postive test
2. check our mock server worker is setup with a negative test
3. gets data from url and everything goes well
4. attempts to get data from url and an error occurs

## PostList

1. Render component on screen.
2. Render component with no subreddit selected.
3. Render component with a subreddit selected.
4. Test pagination next.
5. Test pagination back.
6. Test pagination next and then next.
7. Test pagination next button disables correctly.
8. Test pagination prev button disables correctly.
9. Make the component render an error.

## SearchBar

1. Render component on screen.
2. Use component to search for subreddits and populate the component dropdown.
3. Use component to select a subreddit.
4. Make the component render an error.

## Reddit Service ☑️

1. cleans text to become an accepted SubredditName
2. creates the subreddit list URL with subreddit input
3. creates a correct URL when you provide no subreddit
4. creates a correct URL posts with a subreddit parameter and an after parameter
5. creates a correct URL posts with a subreddit parameter and a before parameter
6. processes the values in a json response so they can be uses by the Post component, for subreddit post example 1
7. processes the values in a json response so they can be uses by the Post component, for subreddit post example 2
8. processes the values in a json response so they can be uses by the Post component, for subreddit post example 3
9. processes the values in a json response so they can be uses by the Post component, for subreddit post example 4

# Integration

# E2E
