import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Home from '@material-ui/icons/Home';
import ImportantDevices from '@material-ui/icons/ImportantDevices';
import Style from '@material-ui/icons/Style';
import ShortText from '@material-ui/icons/ShortText';
import UserFeedbackIcon from '@material-ui/icons/Vibration';
import ArchitectureIcon from '@material-ui/icons/Layers';
import styles from './styles';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Loading from '../../components/Loading/Loading';
import NotificationBell from '../../components/Notifications/NotificationBell';
import NavDrawerItems from './NavDrawerItems';
import ScreenContentWrapper from '../../components/Screen/ScreenContentWrapper';
import routes from '../../../imports/modules/routes';

const navDrawerLinks = [
  { to: '/', text: 'Home', icon: <Home />, dataE2E: 'nav-page-home' },
  {
    to: routes.styling.getPath(),
    text: routes.styling.title,

    icon: <Style />,
    dataE2E: `nav-page-${routes.styling.title}`,
  },
  {
    to: routes.typography.getPath(),
    text: routes.typography.title,

    icon: <ShortText />,
    dataE2E: `nav-page-${routes.typography.title}`,
  },
  {
    to: routes.dynamicImports.getPath(),
    text: routes.dynamicImports.title,

    icon: <ImportantDevices />,
    dataE2E: `nav-page-${routes.dynamicImports.title}`,
  },
  {
    to: routes.userFeedback.getPath(),
    text: routes.userFeedback.title,

    icon: <UserFeedbackIcon />,
    dataE2E: `nav-page-${routes.userFeedback.title}`,
  },
  {
    to: routes.architecture.getPath(),
    text: routes.architecture.title,

    icon: <ArchitectureIcon />,
    dataE2E: `nav-page-${routes.architecture.title}`,
  },
];

const propTypes = {
  children: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool,
  hideNavigation: PropTypes.bool,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  screenTitle: PropTypes.string,
  user: PropTypes.object,
};
const defaultProps = {
  fullScreen: false,
  hideNavigation: false,
  loading: false,
  screenTitle: '',
  user: null,
};

const TitleBarAndNavDrawer = props => {
  const { children, user, location, loading, fullScreen, history, hideNavigation, screenTitle } = props;

  const contentContainerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = styles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderCloseIcon = () => {
    if (!fullScreen) {
      return null;
    }
    return (
      <IconButton
        color="inherit"
        aria-label="go back"
        onClick={() => {
          history.goBack();
        }}
      >
        <CloseIcon />
      </IconButton>
    );
  };
  const renderDrawer = () => {
    const drawer = (
      <div className={classes.drawer}>
        <div className={classes.drawerHeader} />
        <NavDrawerItems onNavClick={handleDrawerToggle} user={user} links={navDrawerLinks} />
      </div>
    );

    return drawer;
  };

  const renderNavigationBar = () => {
    if (hideNavigation === true || fullScreen === true) {
      return (
        <AppBar className={classes.appBarHiddenNavigation}>
          <Toolbar data-e2e="navigation-toolbar" className={classes.toolbar}>
            {renderCloseIcon()}
            <Typography className={classes.titleText} variant="h1" color="inherit" noWrap data-e2e="app-bar-text">
              {screenTitle}
            </Typography>
            <NotificationBell className={classes.notificationBell} history={history} location={location} />
          </Toolbar>
          {loading ? <Loading linear /> : null}
        </AppBar>
      );
    }
    return (
      <>
        <AppBar className={classes.appBar}>
          <Toolbar data-e2e="navigation-toolbar" className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.titleText} variant="h1" color="inherit" noWrap data-e2e="app-bar-text">
              {screenTitle}
            </Typography>
            <NotificationBell className={classes.notificationBell} history={history} location={location} />
          </Toolbar>
          {loading ? <Loading linear /> : null}
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
          >
            {renderDrawer()}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {renderDrawer()}
          </Drawer>
        </Hidden>
      </>
    );
  };

  return (
    <div className={classes.appFrame}>
      {renderNavigationBar()}
      <div className={classes.contentContainer} ref={contentContainerRef}>
        <ErrorBoundary>
          <ScreenContentWrapper>{children}</ScreenContentWrapper>
        </ErrorBoundary>
      </div>
    </div>
  );
};

TitleBarAndNavDrawer.propTypes = propTypes;

TitleBarAndNavDrawer.defaultProps = defaultProps;

export default TitleBarAndNavDrawer;
