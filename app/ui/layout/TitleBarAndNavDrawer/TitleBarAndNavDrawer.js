import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  children: PropTypes.element.isRequired,
};
const defaultProps = {};

const useStyles = makeStyles(() => ({
  root: {
    border: '1px dashed pink',
  },
}));

const TitleBarAndNavDrawer = props => {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

TitleBarAndNavDrawer.propTypes = propTypes;

TitleBarAndNavDrawer.defaultProps = defaultProps;

export default TitleBarAndNavDrawer;
