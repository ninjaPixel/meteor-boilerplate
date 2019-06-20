import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  delayed: PropTypes.bool,
  disabled: PropTypes.bool,
  target: PropTypes.string,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
const defaultProps = {
  className: undefined,
  color: 'secondary',
  delayed: false,
  disabled: false,
  target: undefined,
  variant: 'contained',
};

const useStyles = makeStyles(() => ({
  root: {},
  default: {
    textDecoration: 'none',
  },
}));

const LinkButton = props => {
  const { className, to, children, target, delayed, ...rest } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  const cssClass = classNames({
    [rootClass]: true,
    [classes.default]: true,
  });
  return (
    <Link className={cssClass} to={to}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};

LinkButton.propTypes = propTypes;

LinkButton.defaultProps = defaultProps;

export default LinkButton;
