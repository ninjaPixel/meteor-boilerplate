import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { paperStyle, responsivePaperTitleStyle } from '../../styles/common';
const propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};

const defaultProps = {};

const ResponsivePaper = (props) => {
  const { classes, width, children, paperClassName, title } = props;
  if (isWidthUp('sm', width)) {
    return (
      <Fragment>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
        <Paper className={paperClassName || classes.paper}>{children}</Paper>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
      {children}
    </Fragment>
  );
};

ResponsivePaper.propTypes = propTypes;

ResponsivePaper.defaultProps = defaultProps;

const style = (theme) => ({
  paper: paperStyle(theme),
  title: responsivePaperTitleStyle(theme),
});

export default withStyles(style)(withWidth()(ResponsivePaper));
