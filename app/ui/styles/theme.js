import primary from '@material-ui/core/colors/indigo';
import secondary from '@material-ui/core/colors/teal';
import tertiary from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import { createMuiTheme } from '@material-ui/core/styles';

const fontWeightLight = 200;
const fontWeightRegular = 200;
const fontWeightMedium = 400;
const theme = createMuiTheme({
  /*
    there are 16 units of spacing.
    '1' is the default 8px.
    '0' (4px) should only be used for icon related stuff.
    Note that the scale is not linear.
   */
  spacing: factor => [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 769][factor],
  palette: {
    primary,
    secondary,
    tertiary: {
      light: tertiary[100],
      main: tertiary[300],
      dark: brown[800],
      contrastText: brown[800],
    },
    // type: 'dark',
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
