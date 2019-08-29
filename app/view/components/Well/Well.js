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
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.tertiary.main,
    border: `2px solid ${theme.palette.tertiary.dark}`,
    borderRadius: theme.spacing(2),
  },
  type: {
    color: theme.palette.tertiary.contrastText,
  },
}));

const Well = props => {
  const { className, children } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography className={classes.type}>{children}</Typography>
    </div>
  );
};

Well.propTypes = propTypes;

Well.defaultProps = defaultProps;

export default Well;
