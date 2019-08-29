/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const ComponentList = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography>ComponentList component.</Typography>
    </div>
  );
};

ComponentList.propTypes = propTypes;

ComponentList.defaultProps = defaultProps;

export default ComponentList;
