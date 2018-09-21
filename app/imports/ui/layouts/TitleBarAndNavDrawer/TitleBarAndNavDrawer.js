import { withTracker } from 'meteor/react-meteor-data';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles, Grid, Drawer, AppBar, Toolbar, Typography, IconButton, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import NavDrawerItems from '../../components/NavDrawerItems/NavDrawerItems';
import Loading from '../../components/Loading/Loading';
import GlobalSnackbar from '../../components/GlobalSnackbar/GlobalSnackbar';
// import security from '../../../modules/security';
import styles from './styles';
import reactiveState from '../../../api/State/client/reactiveState';

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

  render404() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <div className={classes.fourOhFour}>
            <img className={classes.fourOhFourImage} src="https://media.giphy.com/media/Ra4J7WCjmcnXW/giphy.gif" alt="404" />
            <Typography variant="headline">We don't recognise this company.</Typography>
            <Typography variant="headline">Check the URL, this looks like a typo.</Typography>
          </div></div></div>);
  }

  renderCloseIcon() {
    const {distractionFree, history } = this.props;
    if (!distractionFree) {
      return null;
    }
    return (
      <IconButton
        color="inherit"
        aria-label="go back"
        onClick={() => { history.goBack(); }}
      >
        <CloseIcon />
      </IconButton>
    );
  }

  renderNavigationBar() {
    const { classes, screenTitle, hideNavigation, loading, distractionFree } = this.props;

    if (hideNavigation === true || distractionFree === true) {
      return (
        <AppBar className={classes.appBarHiddenNavigation}>
          <Toolbar data-e2e="navigation-toolbar">
            {this.renderCloseIcon()}
            <Typography variant="title" color="inherit" noWrap>
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
            <Typography variant="title" color="inherit" noWrap>
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
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
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
        <Grid container className={classes.contentContainerGrid} ref={(elem) => { this.contentContainer = elem; }}>
          <ErrorBoundary>
            <Grid item xs={12} className={classes.mainContent} data-e2e="main-content" >
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
  distractionFree: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

TitleBarAndNavDrawer.defaultProps = ({
  screenTitle: '',
  user: null,
  loading: false,
  hideNavigation: false,
  distractionFree: false,
});

const StyledTitleBarAndNavDrawer = withStyles(styles)(TitleBarAndNavDrawer);
// const StyledTitleBarAndNavDrawer = withRouter(withStyles(styles)(TitleBarAndNavDrawer));

export default withTracker((props) => {
  const screenTitle = reactiveState.screenTitle.get();
  return {
    screenTitle,
    // hideNavigation: hideNavigation.get(),
  };
})(StyledTitleBarAndNavDrawer);
