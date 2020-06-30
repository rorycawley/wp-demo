import { createMuiTheme } from '@material-ui/core/styles';

const redditWhite = '#ffffff';
const redditGrey = '#dae0e6';
export const redditOrange = '#ff4500';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `${redditWhite}`,
    },
    secondary: {
      main: `${redditGrey}`,
    },
  },
});

export default theme;
