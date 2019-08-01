import primary from '@material-ui/core/colors/indigo';
import secondary from '@material-ui/core/colors/teal';
import tertiary from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import { createMuiTheme } from '@material-ui/core/styles';

const SERIF_FONT = ['"Rokkitt"', 'monospace'].join(',');
const SANS_SERIF_FONT = ['"Titillium Web"', 'sans-serif'].join(',');
const fontWeightLight = 200;
const fontWeightRegular = 200;
const fontWeightMedium = 400;
const theme = createMuiTheme({
  /*
    there are 17 units of spacing.
    '2' is the default 8px.
    '1' (4px) should only be used for icon related stuff.
    Note that the scale is not linear.
   */
  spacing: factor => [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 640, 769][factor],
  palette: {
    primary,
    secondary,
    tertiary: {
      light: tertiary[100],
      main: tertiary[300],
      dark: brown[800],
      contrastText: brown[800],
    },
    type: 'dark',
  },
  custom: {
    noLink: {
      textDecoration: 'none',
    },
  },
  typography: {
    fontFamily: SERIF_FONT,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    h1: {
      fontWeight: fontWeightLight,
    },
    body1: {
      fontFamily: SANS_SERIF_FONT,
      fontWeight: fontWeightMedium,
    },
    body2: {
      fontFamily: SANS_SERIF_FONT,
      fontWeight: fontWeightRegular,
    },
    fontSize: 16,
    /*
      Please, never override the browser font size!
      htmlFontSize: 16, // don't set this field!
    */
  },
});

export default theme;
