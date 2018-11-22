import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { paperStyle } from '../../styles/common';
const propTypes = {
  classes: PropTypes.object.isRequired,
};

const defaultProps = {};

const ResponsivePaper = (props) => {
  const { classes, width, children, paperClassName } = props;
  if (isWidthUp('sm', width)) {
    return <Paper className={paperClassName || classes.paper}>{children}</Paper>;
  }
  return children;
};

ResponsivePaper.propTypes = propTypes;

ResponsivePaper.defaultProps = defaultProps;

const style = (theme) => ({
  paper: paperStyle(theme),
});

export default withStyles(style)(withWidth()(ResponsivePaper));
