import makeStyles from '@material-ui/styles/makeStyles';
import { TYPE_SCALE } from '../../../imports/ui/styles/constants';

const drawerWidth = 240;
const appBarHeightXS = 56;
const appBarHeight = 64;

const styles = makeStyles(theme => ({
  appFrame: {
    minHeight: '100vh',
    minWidth: '100vw',
    maxWidth: '100vw',
    position: 'absolute',
    display: 'flex',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  fourOhFour: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    maxWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  fourOhFourImage: {
    paddingBottom: theme.spacing(4),
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  appBar: {
    height: appBarHeightXS,
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
    },
    position: 'fixed',
    marginLeft: drawerWidth,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: 0,
    },
  },
  appBarHiddenNavigation: {
    height: appBarHeightXS,
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
    },
    position: 'fixed',
    width: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  titleText: {
    fontSize: TYPE_SCALE['36'],
    fontWeight: 'bold',
  },
  drawer: {
    position: 'fixed',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: drawerWidth,
    border: `1px solid ${theme.palette.divider}`,
  },
  drawerHeader: {
    // ...theme.mixins.toolbar,
    // padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderImage: {
    width: '100%',
  },
  drawerHeaderImageUplodaBtn: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.5,
  },
  drawerPaper: {
    zIndex: 'auto',
    width: drawerWidth,
    maxWidth: '100vw',
    border: 'none',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },

  contentContainerGrid: {
    backgroundColor: theme.palette.background.default,
    marginTop: appBarHeightXS,
    [theme.breakpoints.up('sm')]: {
      marginTop: appBarHeight,
    },
  },
  notificationBell: {
    color: theme.palette.primary.contrastText,
  },
}));
export default styles;
