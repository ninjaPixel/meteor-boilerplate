import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { paperStyle, responsivePaperTitleStyle } from '../../styles/common';

const propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  paperClassName: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
};

const defaultProps = {
  paperClassName: undefined,
  title: undefined,
};

const ResponsivePaper = props => {
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

const style = theme => ({
  paper: paperStyle(theme),
  title: responsivePaperTitleStyle(theme),
});

export default withStyles(style)(withWidth()(ResponsivePaper));
