import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose(event, reason) {
    if (reason === 'clickaway') {
      // reason: Can be:"timeout" (autoHideDuration expired) or: "clickaway"
      return;
    }
    this.props.requestClose();
  }

  render() {
    const { classes, text, actions, open, autoHideDuration } = this.props;
    return (
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={this.handleRequestClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{text}</span>}
        action={[
          ...actions,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>]}
      />
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  requestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number,
  actions: PropTypes.array,
};

Snackbar.defaultProps = {
  autoHideDuration: 8000,
  actions: [],
};

export default withStyles(styles)(Snackbar);
