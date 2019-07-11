import primary from '@material-ui/core/colors/indigo';
import secondary from '@material-ui/core/colors/pink';
import tertiary from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import { createMuiTheme } from '@material-ui/core/styles';

const fontWeightLight = 200;
const fontWeightRegular = 200;
const fontWeightMedium = 400;
const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    tertiary: {
      light: tertiary[100],
      main: tertiary[300],
      dark: brown[800],
      contrastText: brown[800],
    },
    type: 'light',
  },
  custom: {
    noLink: {
      textDecoration: 'none',
    },
  },
  typography: {
    fontFamily: ['"Rokkitt"', 'monospace'].join(','),
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    h1: {
      fontWeight: fontWeightLight,
    },
    fontSize: 16,
    // Tell Material-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: 16,
  },
});

export default theme;
