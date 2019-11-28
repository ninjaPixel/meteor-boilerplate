import primary from '@material-ui/core/colors/yellow';
import secondary from '@material-ui/core/colors/teal';
import tertiary from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { FONT_WEIGHTS } from './constants';

const SERIF_FONT = ['"Rokkitt"', 'monospace'].join(',');
const SANS_SERIF_FONT = ['"Titillium Web"', 'sans-serif'].join(',');
const fontWeightLight = FONT_WEIGHTS.light;
const fontWeightRegular = FONT_WEIGHTS.regular;
const fontWeightMedium = FONT_WEIGHTS.medium;
const fontWeightBold = FONT_WEIGHTS.bold;
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
  typography: {
    fontFamily: SERIF_FONT,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    h1: {
      fontWeight: fontWeightLight,
      fontSize: '5.0rem',
    },
    h2: {
      fontSize: '3.4rem',
      fontWeight: fontWeightMedium,
    },
    h3: {
      fontSize: '2.4rem',
      fontWeight: fontWeightRegular,
    },
    h4: {
      fontSize: '2.0rem',
      fontWeight: fontWeightRegular,
    },
    h5: {
      fontSize: '1.8rem',
      fontWeight: fontWeightBold,
    },
    h6: {
      fontSize: '1.6rem',
      fontWeight: fontWeightMedium,
    },
    body1: {
      fontFamily: SANS_SERIF_FONT,
      fontWeight: fontWeightRegular,
    },
    body2: {
      fontFamily: SANS_SERIF_FONT,
      fontWeight: fontWeightRegular,
    },
    caption: {
      fontWeight: fontWeightRegular,
    },
    fontSize: 16,
    /*
      Please, never override the browser font size!
      htmlFontSize: 16, // don't set this field!
    */
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: fontWeightBold,
        letterSpacing: '0.05rem',
      },
    },
  },
});

export default responsiveFontSizes(theme);
