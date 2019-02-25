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
import Loader from '../../components/Loading/Loading';
import Theme from '../../styles/Theme';
import { defaultRootStyle } from '../../styles/root';
import routes from '../../../modules/routes';
import { SPACING, TYPE_SCALE } from '../../styles/constants';

const _HomeScreen = (props) => (
  <div className={props.classes.root}>
    <header>
      <Typography variant="h2" className={props.classes.pageTitle}>
        Home screen
      </Typography>
    </header>
    <Typography>Some text...</Typography>
  </div>
);
const styles = (theme) => ({
  root: defaultRootStyle(theme),
  pageTitle: {
    fontSize: TYPE_SCALE['48'],
    marginTop: SPACING['12'],
    marginBottom: SPACING['4'],
  },
});

const HomeScreen = withStyles(styles)(_HomeScreen);

const App = (props) => {
  const paths = () => {
    const appRoutes = Object.keys(routes).map((key) => {
      const { path, exact, title, loginRequired, importFunction, fullScreen } = routes[key];
      return (
        <AppRoute
          key={path}
          path={path}
          exact={exact}
          title={title}
          loginRequired={loginRequired}
          fullScreen={fullScreen}
          component={DeferredComponent}
          loadingComponent={<Loader />}
          importFunction={importFunction}
          {...props}
        />
      );
    });

    /*
    having a key on each route ensures that the DeferredComponent updates between route changes,
    between deferred components.
     */
    return [
      ...appRoutes,
      <AppRoute key="/" path="/" exact title="Meteor Boilerplate" component={HomeScreen} {...props} />,
      <AppRoute
        key="404"
        title="404"
        path="/"
        component={DeferredComponent}
        loadingComponent={<Loader />}
        importFunction={() => import('/imports/ui/screens/FourOhFour/FourOhFour.js')}
        {...props}
      />,
    ];
  };

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
