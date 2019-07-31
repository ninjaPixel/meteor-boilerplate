import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import baseTheme from './styles/theme';
import Home from './screens/Home/Home';
import DeferredComponent from './components/DeferredComponent/DeferredComponent';
import Loading from './components/Loading/Loading';
import AppRoute from './layout/AppRoute/AppRoute';
import routes from '../imports/modules/newRoutes';
import { middleOfScreenStyle } from './styles/common';
import Snacks from './components/Snacks/Snacks';

const propTypes = {
  events: PropTypes.object,
  state: PropTypes.object,
  user: PropTypes.object,
};

const defaultProps = {
  user: undefined,
};
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  loading: middleOfScreenStyle(theme),
}));

const ScreenLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <Loading />
    </div>
  );
};

const App = props => {
  const classes = useStyles({ color: 'white' });
  const commonProps = {};
  const paths = () => {
    const appRoutes = Object.keys(routes).map(key => {
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
          loadingComponent={<ScreenLoader />}
          importFunction={importFunction}
          {...commonProps}
        />
      );
    });

    /*
    having a key on each route ensures that the DeferredComponent updates between route changes,
    between deferred components.
     */
    return [
      ...appRoutes,
      <AppRoute key="/" path="/" exact title="Meteor Boilerplate" component={Home} {...commonProps} />,
      <AppRoute
        key="404"
        title="404"
        path="/"
        component={DeferredComponent}
        loadingComponent={<ScreenLoader />}
        importFunction={() => import('./components/FourOhFour/FourOhFour.js')}
        {...commonProps}
      />,
    ];
  };

  return (
    <div className={classes.root}>
      <Router>
        <Switch>{paths()}</Switch>
      </Router>
    </div>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

const ThemedApp = props => {
  const { theme, ...rest } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App {...rest} />
      <Snacks />
    </ThemeProvider>
  );
};

ThemedApp.propTypes = { ...propTypes, theme: PropTypes.object };
ThemedApp.defaultProps = { ...defaultProps, theme: baseTheme };

export default ThemedApp;
