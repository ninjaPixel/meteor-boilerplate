import colors from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.pink,
    type: 'dark',
  },
  custom: {
    noLink: {
      textDecoration: 'none',
    },
  },
  typography: {
    fontSize: 18,
    fontFamily: [
      '"Rokkitt"',
      'serif',
    ].join(','),
  },
});

export default theme;
