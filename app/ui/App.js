import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import baseTheme from './styles/theme';
import Home from './components/Home/Home';
import FourOhFour from './components/FourOhFour/FourOhFour';
// import Big from './components/Big/Big';
import DeferredComponent from './components/DeferredComponent/DeferredComponent';

const propTypes = {
  events: PropTypes.object,
  state: PropTypes.object,
};
const defaultProps = {};
const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
}));

const App = props => {
  const { events, state } = props;
  const classes = useStyles({ color: 'white' });
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route path="/" exact render={routeProps => <Home />} />
          <Route
            path="/big"
            exact
            render={routeProps => <DeferredComponent importFunction={() => import('./components/Big/Big.js')} />}
          />
          <Route path="/" title="404" render={routeProps => <FourOhFour />} />
        </Switch>
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
    </ThemeProvider>
  );
};

ThemedApp.propTypes = { ...propTypes, theme: PropTypes.object };
ThemedApp.defaultProps = { ...defaultProps, theme: baseTheme };

export default ThemedApp;
