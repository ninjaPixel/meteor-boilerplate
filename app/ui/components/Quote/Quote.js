import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  author: PropTypes.string,
};
const defaultProps = {
  className: undefined,
  author: undefined,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 4),
    borderLeft: `2px solid ${theme.palette.text.secondary}`,
  },
  author: {
    marginTop: theme.spacing(2),
  },
}));

const Quote = props => {
  const { author, className, children } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography variant="body1">{children}</Typography>
      <Typography variant="caption">{author}</Typography>
    </div>
  );
};

Quote.propTypes = propTypes;

Quote.defaultProps = defaultProps;

export default Quote;
