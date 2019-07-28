import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.string.isRequired,
};
const defaultProps = {
  className: undefined,
  target: '_self',
};

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

const LinkComponent = props => {
  const { className, to, target, children } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  const externalLink = to.startsWith('http');
  if (externalLink) {
    return (
      <a href={to} target={target} className={rootClass}>
        {children}
      </a>
    );
  }
  return (
    <Link className={rootClass} to={to}>
      <Typography>{children}</Typography>
    </Link>
  );
};

LinkComponent.propTypes = propTypes;

LinkComponent.defaultProps = defaultProps;

export default LinkComponent;
