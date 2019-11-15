/* eslint-disable react/prop-types */

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/styles/makeStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from '../view/styles/theme';

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

const StoryWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterWrapper>{children}</RouterWrapper>
    </ThemeProvider>
  );
};

export default StoryWrapper;
