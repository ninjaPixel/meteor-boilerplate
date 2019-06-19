import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  linear: PropTypes.bool,
  size: PropTypes.number,
  text: PropTypes.string,
};
const defaultProps = {
  className: undefined,
  children: '',
  linear: false,
  size: 100,
  text: '',
};

const useStyles = makeStyles(() => ({
  loading: {
    alignSelf: 'stretch',
  },
  circular: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignSelf: 'center',
    border: '1px solid white',
  },
}));

const Loading = props => {
  const { className, children, size, linear, ...rest } = props;
  const classes = useStyles();
  const rootClass = classNames({
    [classes.loading]: true,
    [classes.circular]: !linear,
    [className]: !!className,
  });
  return (
    <div className={rootClass}>
      {linear ? <LinearProgress {...rest} /> : <CircularProgress {...rest} size={size} />}
      <Typography align="center">{children}</Typography>
    </div>
  );
};

Loading.propTypes = propTypes;

Loading.defaultProps = defaultProps;

export default Loading;
