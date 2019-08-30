import primary from '@material-ui/core/colors/indigo';
import secondary from '@material-ui/core/colors/teal';
import tertiary from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { FONT_WEIGHTS } from './constants';

const SERIF_FONT = ['"Rokkitt"', 'monospace'].join(',');
const SANS_SERIF_FONT = ['"Titillium Web"', 'sans-serif'].join(',');
const fontWeightLight = FONT_WEIGHTS.light;
const fontWeightRegular = FONT_WEIGHTS.regular;
const fontWeightMedium = FONT_WEIGHTS.bold;
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
      fontSize: '5.0rem',
    },
    h2: {
      fontSize: '3.4rem',
    },
    h3: {
      fontSize: '2.4rem',
    },
    h4: {
      fontSize: '2.0rem',
    },
    h5: {
      fontSize: '1.8.0rem',
    },
    h6: {
      fontSize: '1.6rem',
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

export default responsiveFontSizes(theme);
