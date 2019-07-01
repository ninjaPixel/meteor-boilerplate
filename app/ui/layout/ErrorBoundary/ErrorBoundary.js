import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import ReactErrorBoundary from 'react-error-boundary';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(),
    width: '100%',
    height: '100%',
  },
}));
const ErrorFallback = ({ componentStack, error }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6">We ran into an error:</Typography>
      <Typography>{error.toString()}</Typography>
      <Typography variant="h6">Component stack</Typography>
      <Typography>{componentStack.toString()}</Typography>
    </div>
  );
};

const ErrorBoundary = props => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ReactErrorBoundary>
);

export default ErrorBoundary;
