/* eslint-disable react/prop-types */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/styles/makeStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import theme from '../view/styles/theme';
import { store } from '../controller/store';

/*
 There are a few things that our components need to be
 wrapped in, to render
 */
const useStyles = makeStyles(myTheme => ({
  root: {
    padding: myTheme.spacing(3),
  },
}));
const RouterWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Route>{children}</Route>
      </Router>
    </div>
  );
};

// hmm, the grid won't show if we use CSS Baseline
// not ideal, as we do use that in the main app.
const _StoryWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterWrapper>{children}</RouterWrapper>
      </Provider>
    </ThemeProvider>
  );
};

const StoryWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterWrapper>{children}</RouterWrapper>
      </Provider>
    </ThemeProvider>
  );
};

export default StoryWrapper;
