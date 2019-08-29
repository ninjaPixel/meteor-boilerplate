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

const useStyles = makeStyles(theme => {
  const { type } = theme.palette;
  const color = type === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark;
  const color2 = theme.palette.secondary.main;
  return {
    root: {
      backgroundImage: `linear-gradient( transparent 0%, transparent calc(50% - 8px), ${color2} calc(50% - 8px), ${color2} 100% )`,
      backgroundPosition: '0 0',
      backgroundSize: '100% 200%',
      color: 'inherit',
      padding: 0,
      textDecoration: 'none',
      transition: 'background-position 120ms ease-in-out, padding 120ms ease-in-out',
      '&:hover': {
        backgroundImage: `linear-gradient( transparent 0%, transparent calc(50% - 8px), ${color2} calc(50% - 8px), ${color2} 100% )`,
        backgroundPosition: '0 100%',
        color,
        padding: '2px 0 4px 0',
      },
    },
  };
});

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
      <Typography component="span">{children}</Typography>
    </Link>
  );
};

LinkComponent.propTypes = propTypes;

LinkComponent.defaultProps = defaultProps;

export default LinkComponent;
