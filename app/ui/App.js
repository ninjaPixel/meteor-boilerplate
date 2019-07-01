import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import baseTheme from './styles/theme';
import Home from './components/Home/Home';
import FourOhFour from './components/FourOhFour/FourOhFour';
import DeferredComponent from './components/DeferredComponent/DeferredComponent';
import Loading from './components/Loading/Loading';
import AppRoute from './layout/AppRoute/AppRoute';

const propTypes = {
  events: PropTypes.object,
  state: PropTypes.object,
  user: PropTypes.object,
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
  const classes = useStyles({ color: 'white' });
  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <AppRoute title="Meteor Boilerplate" path="/" exact component={Home} />
          <AppRoute
            title="Big page"
            path="/big"
            exact
            importFunction={() => import('./components/Big/Big.js')}
            loadingComponent={
              <Loading color="secondary" linear>
                Loading component
              </Loading>
            }
            component={DeferredComponent}
          />
          <AppRoute title="404 :(" path="/" component={FourOhFour} />
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
