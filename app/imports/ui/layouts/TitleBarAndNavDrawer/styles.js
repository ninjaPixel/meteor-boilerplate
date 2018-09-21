const drawerWidth = 240;
const appBarHeightXS = 56;
const appBarHeight = 64;


const styles = theme => ({

  appFrame: {
    minHeight: '100vh',
    minWidth: '100vw',
    maxWidth: '100vw',
    position: 'absolute',
    display: 'flex',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
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

  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    position: 'fixed',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: drawerWidth,
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
    top: theme.spacing.unit / 2,
    left: theme.spacing.unit / 2,
    backgroundColor: 'black',
    color: 'white',
    opacity: 0.5,
  },
  drawerPaper: {
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

});
export default styles;
