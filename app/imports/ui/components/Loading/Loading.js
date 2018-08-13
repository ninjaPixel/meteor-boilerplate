import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import classNames from 'classnames';

const Loading = (props) => {
  const { classes } = props;
  const rootClass = classNames({
    [classes.loading]: true,
    [classes.circular]: !props.linear,
  });
  return (
    <div className={rootClass}>
      <span className={classes.loadingContainer}>
        {props.linear ? <LinearProgress /> : <CircularProgress size={props.size} /> }
        <Typography align="center">{props.text}</Typography>
      </span>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  linear: PropTypes.bool,
};

Loading.defaultProps = {
  text: '',
  size: 100,
  linear: false,
};

const styles = {
  loading: {
    alignSelf: 'stretch',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  circular: {
    display: 'flex',

  },
  loadingContainer: {
    alignSelf: 'center',

  },
};

export default withStyles(styles)(Loading);
