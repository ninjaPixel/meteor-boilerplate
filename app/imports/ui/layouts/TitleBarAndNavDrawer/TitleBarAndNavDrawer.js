import { withTracker } from 'meteor/react-meteor-data';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import NavDrawerItems from '../../components/NavDrawerItems/NavDrawerItems';
import Loading from '../../components/Loading/Loading';
import GlobalSnackbar from '../../components/GlobalSnackbar/GlobalSnackbar';
import styles from './styles';
import reactiveState from '../../../../model/api/State/client/reactiveState';

class TitleBarAndNavDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      // screenTitle: props.screenTitle,
    };
    this.handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // things to do when the user navigates between screens
      try {
        // scroll the content back to the top when navigating
        this.contentContainer.scrollTop = 0;
      } catch (ex) {
        /*
          // for some reason this fails, in iOS Chrome, when the user refreshes page
          // which is actually fine, because they will already be at top of the page in this situation
         */
      }

      // reset the snackbar - doesn't work as it overwrites genuine messages.
      // snacks.clear();
    }
  }

  renderDrawer() {
    const { classes, user } = this.props;

    const drawer = (
      <div className={classes.drawer}>
        <div className={classes.drawerHeader} />
        <NavDrawerItems onNavClick={this.handleDrawerToggle} user={user} />
      </div>
    );

    return drawer;
  }

  renderCloseIcon() {
    const { fullScreen, history } = this.props;
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
  }

  renderNavigationBar() {
    const { classes, screenTitle, hideNavigation, loading, fullScreen } = this.props;

    if (hideNavigation === true || fullScreen === true) {
      return (
        <AppBar className={classes.appBarHiddenNavigation}>
          <Toolbar data-e2e="navigation-toolbar">
            {this.renderCloseIcon()}
            <Typography className={classes.titleText} variant="h1" color="inherit" noWrap data-e2e="app-bar-text">
              {screenTitle}
            </Typography>
          </Toolbar>
          {loading ? <Loading linear /> : null}
        </AppBar>
      );
    }
    return (
      <Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar data-e2e="navigation-toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
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
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={this.handleDrawerToggle}
          >
            {this.renderDrawer()}
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
            {this.renderDrawer()}
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appFrame}>
        {this.renderNavigationBar()}
        <Grid
          container
          className={classes.contentContainerGrid}
          ref={(elem) => {
            this.contentContainer = elem;
          }}
        >
          <ErrorBoundary>
            <Grid item xs={12} className={classes.mainContent} data-e2e="main-content">
              {this.props.children}
            </Grid>
          </ErrorBoundary>
        </Grid>
        <GlobalSnackbar />
      </div>
    );
  }
}

TitleBarAndNavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  screenTitle: PropTypes.string,
  user: PropTypes.object,
  loading: PropTypes.bool,
  hideNavigation: PropTypes.bool,
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

TitleBarAndNavDrawer.defaultProps = {
  screenTitle: '',
  user: null,
  loading: false,
  hideNavigation: false,
  fullScreen: false,
};

const StyledTitleBarAndNavDrawer = withStyles(styles)(TitleBarAndNavDrawer);
// const StyledTitleBarAndNavDrawer = withRouter(withStyles(styles)(TitleBarAndNavDrawer));

export default withTracker((props) => {
  const screenTitle = reactiveState.screenTitle.get();
  return {
    screenTitle,
    // hideNavigation: hideNavigation.get(),
  };
})(StyledTitleBarAndNavDrawer);
