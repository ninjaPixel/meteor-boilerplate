import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ReactErrorBoundary from 'react-error-boundary';

const ErrorFallback = ({ componentStack, error, classes }) => (
  <div className={classes.root}>
    <Typography variant="h6">We ran into an error:</Typography>
    <Typography>{error.toString()}</Typography>
    <Typography variant="h6">Component stack</Typography>
    <Typography>{componentStack.toString()}</Typography>
  </div>
);

const ErrorBoundary = props => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ReactErrorBoundary>
);

const styles = theme => ({
  root: {
    padding: theme.spacing(),
    width: '100%',
    height: '100%',
  },
});

export default withStyles(styles)(ErrorBoundary);
