import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(1),
  },
}));

const InlineCode = props => {
  const { className, children } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <Typography className={rootClass} component="span">
      {children}
    </Typography>
  );
};

InlineCode.propTypes = propTypes;

InlineCode.defaultProps = defaultProps;

export default InlineCode;
