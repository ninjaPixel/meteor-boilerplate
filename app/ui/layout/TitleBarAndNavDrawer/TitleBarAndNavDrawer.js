import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Loading from '../../../imports/ui/components/Loading/Loading';

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
  const { children, user, loading, fullScreen, history, hideNavigation, screenTitle } = props;
  console.log('screenTitle: ', screenTitle);
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
        Hello world
        {/*<NavDrawerItems onNavClick={this.handleDrawerToggle} user={user} />*/}
      </div>
    );

    return drawer;
  };

  const renderNavigationBar = () => {
    if (hideNavigation === true || fullScreen === true) {
      return (
        <AppBar className={classes.appBarHiddenNavigation}>
          <Toolbar data-e2e="navigation-toolbar">
            {renderCloseIcon()}
            <Typography className={classes.titleText} variant="h1" color="inherit" noWrap data-e2e="app-bar-text">
              {screenTitle}
            </Typography>
          </Toolbar>
          {loading ? <Loading linear /> : null}
        </AppBar>
      );
    }
    return (
      <>
        <AppBar className={classes.appBar}>
          <Toolbar data-e2e="navigation-toolbar">
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
      <Grid container className={classes.contentContainerGrid} ref={contentContainerRef}>
        <ErrorBoundary>
          <Grid item xs={12} className={classes.mainContent} data-e2e="main-content">
            {children}
          </Grid>
        </ErrorBoundary>
      </Grid>
    </div>
  );
};

TitleBarAndNavDrawer.propTypes = propTypes;

TitleBarAndNavDrawer.defaultProps = defaultProps;

export default TitleBarAndNavDrawer;
