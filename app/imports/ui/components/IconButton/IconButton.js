import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';

const IconButton = (props) => {
  const { classes, text, icon, ...rest } = props;
  const IconElement = icon;
  return (
    <Button {...rest}>
      <IconElement className={classes.icon} />
      {text}
    </Button>
  );
};

IconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

const style = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(style)(IconButton);
