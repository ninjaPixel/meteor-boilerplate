import colors from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const fontWeightLight = 200;
const fontWeightRegular = 200;
const fontWeightMedium = 400;
const theme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.pink,
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
    useNextVariants: true, //https://material-ui.com/style/typography/#migration-to-typography-v2
  },
});

export default theme;
