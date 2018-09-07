const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    paddingTop: 0,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  fourOhFour: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  fourOhFourImage: {
    paddingBottom: theme.spacing.unit * 3,
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarHiddenNavigation: {

  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    // padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeaderImage: {
    width: '100%',
    // maxHeight: 133,
  },
  drawerHeaderImageUplodaBtn: {
    position: 'absolute',
    top: theme.spacing.unit / 2,
    left: theme.spacing.unit / 2,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.5,
  },
  drawerPaper: {
    width: 250,
    border: 'none',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
    },
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingBottom: 0,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      padding: theme.spacing.unit * 3,
      paddingBottom: 0,
    },
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
    marginBottom: 64,
  },
});
export default styles;
