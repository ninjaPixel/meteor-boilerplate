import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ReactErrorBoundary from 'react-error-boundary';


const ErrorFallback = ({ componentStack, error, classes }) => (
  <div className={classes.root}>
    <Typography variant="title">We ran into an error:</Typography>
    <Typography>{error.toString()}</Typography>
    <Typography variant="title">Component stack</Typography>
    <Typography>{componentStack.toString()}</Typography>
  </div>
);

const ErrorBoundary = props => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {props.children}
  </ReactErrorBoundary>
);

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    width: '100%',
    height: '100%',
  },
});

export default withStyles(styles)(ErrorBoundary);
