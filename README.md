<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)

## About the Project

These are the user stories that I derived from the problem exercise:

- as a user, I want to enter a subreddit, so that I can view the the most recent posts in that subreddit
- as a user, while looking at a page of 10 subreddit posts I want to be able to view the previous 10 posts
- as a user, while looking at a page of 10 subreddit posts I want to be able to view the next 10 posts

### Built With

The project was build with these libraries:

- [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Parcel](https://parceljs.org/getting_started.html)
- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)

### Project Structure

The project has 3 core components.

- [ Root ] - the top level container, provides a Context wrapper holding a global state for the currentlychosen subreddit
- [ SearchBar ] - this holds the Autocomplete functionality, it uses the useDataApi hook to fetch list of subreddits
- [ SubRedditPosts ] - it uses the useDataApi hook to fetch a list of posts when the subreddit changes or the page changes

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Unzip the code

```sh
unzip wp-demo.zip
```

2. Change into the new directory

```sh
cd wp-demo
```

3. Install NPM packages

```sh
yarn install
```

4. Build the application and run it on http://localhost:3000

```sh
yarn watch
```

5. Test the application

```sh
yarn test
yarn test:watch
```

6. Build the application for distribution, uses dist/release folder

```JS
yarn build
```
