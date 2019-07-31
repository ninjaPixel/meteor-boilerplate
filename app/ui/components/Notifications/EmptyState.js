import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SvgUndrawEmpty from '../Undraw/UndrawEmpty';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const defaultProps = {};

const EmptyState = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h5">
        There's nothing here
      </Typography>
      <SvgUndrawEmpty viewBox="0 0 1000 1000" width="300" height="300" />
      <Typography>When friends share new things, or comment on your posts, you'll get notified here.</Typography>
    </div>
  );
};

EmptyState.propTypes = propTypes;

EmptyState.defaultProps = defaultProps;

const style = theme => ({
  root: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacing(4),
  },
});

export default withStyles(style)(EmptyState);
