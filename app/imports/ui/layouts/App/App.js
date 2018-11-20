import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withStyles, Typography } from '@material-ui/core';
import DeferredComponent from '../../components/DeferredComponent/DeferredComponent';
import AppRoute from '../../components/AppRoute/AppRoute';
import LoadingComponent from '../../components/Loading/Loading';
import Theme from '../../styles/Theme';
import rootStyles from '../../styles/root';

const _HomeScreen = props => (
  <div className={props.classes.root}>
    <header>
      <Typography variant="h2" gutterBottom>
        Home screen
      </Typography>
    </header>
    <Typography>Some text...</Typography>
  </div>
);
const styles = theme => ({
  ...rootStyles.default(theme),
});

const HomeScreen = withStyles(styles)(_HomeScreen);

const App = props => {
  const paths = () =>
    // having a key on each route ensures that the DeferredComponent updates between route changes, between deferred components.
    [
      <AppRoute key="/" path="/" exact title="Hello, World!" component={HomeScreen} {...props} />,
      <AppRoute
        key="/page1"
        path="/page1"
        title="Page 1 - Dynamically Loaded 😎"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Page1/Page1.js')}
        name="Meteor developer"
        {...props}
      />,
      <AppRoute
        key="/page2"
        path="/page2"
        title="Page 2 - Dynamically Loaded 🚀"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Page2/Page2.js')}
        {...props}
      />,
      <AppRoute
        key="/login"
        path="/login"
        title="Login"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Login/Login.js')}
        {...props}
      />,
      <AppRoute
        key="/logout"
        path="/logout"
        title="Logout"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Logout/Logout.js')}
        {...props}
      />,
      <AppRoute
        key="/legal"
        distractionFree
        path="/legal"
        title="Legal"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Legal/Legal.js')}
        {...props}
      />,
      <AppRoute
        key="/account"
        path="/account/:userId"
        title="Account"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/Account/Account.js')}
        {...props}
      />,
      <AppRoute
        key="/reset-password"
        path="/reset-password/:token"
        title="Reset password"
        exact
        component={DeferredComponent}
        loadingComponent={<LoadingComponent />}
        importFunction={() => import('/imports/ui/screens/ResetPassword/ResetPassword.js')}
        {...props}
      />,
    ];
  return (
    <Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={Theme}>
        <Router>
          <Switch>{paths()}</Switch>
        </Router>
      </MuiThemeProvider>
    </Fragment>
  );
};
App.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  user: undefined,
};

export default withTracker(() => {
  const userId = Meteor.userId();
  const handle = {
    ready() {
      return true;
    },
  };
  // if (userId) {
  //   handle = Meteor.subscribe('users.one', userId);
  // }
  const user = Meteor.users.findOne({ _id: userId }) || Meteor.user();
  const loading = Meteor.loggingIn() || !Roles.subscription.ready() || !handle.ready();

  return {
    loading,
    user,
  };
})(App);
