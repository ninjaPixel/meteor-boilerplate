import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import classNames from 'classnames';

const Loading = (props) => {
  const { classes, className, size, linear, ...rest } = props;
  const rootClass = classNames({
    [classes.loading]: true,
    [classes.circular]: !props.linear,
    [className]: !!className,
  });
  return (
    <div className={rootClass}>
      <span className={classes.loadingContainer}>
        {linear ? <LinearProgress {...rest} /> : <CircularProgress {...rest} size={size} />}
        <Typography align="center">{props.text}</Typography>
      </span>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
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
    // flex: 1,
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
