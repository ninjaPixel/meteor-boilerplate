import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Modal, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import Loading from '../Loading/Loading';

class ModalCard extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state = { processingSubmit: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
  }

  handleSubmit() {
    this.props.onRequestOk();
  }
  handleCloseRequest(a, b) {
    if (!this.props.processingSubmit) {
      this.props.onClose(a, b);
    }
  }

  renderChildren() {
    const { classes, children } = this.props;
    if (!children) {
      return null;
    }
    return (
      <div className={classes.children}>
        {children}
      </div>
    );
  }

  render() {
    const { classes, okText, cancelText, title, text, show, children, processingSubmit, hideOkButton, hideCancelButton } = this.props;
    return (
      <Modal open={show} onClose={this.handleCloseRequest} className={classes.backdrop}>
        <Card className={classes.modalCard} data-e2e="modal-card">
          <CardContent className={classes.cardContent}>
            {title ? <Typography variant="headline" gutterBottom>{title}</Typography> : null}
            {text ?
              <Typography>{text}</Typography> : null}
            {this.renderChildren()}
          </CardContent>
          <CardActions>
            {hideOkButton ? null : <Button data-e2e="modal-confirm" size="small" onClick={this.handleSubmit} disabled={processingSubmit}>{okText}</Button>}
            {hideCancelButton ? null : <Button data-e2e="modal-cancel" size="small" onClick={this.handleCloseRequest} disabled={processingSubmit} >{cancelText}</Button>}
          </CardActions>
          {processingSubmit ? <Loading linear /> : null}
        </Card>
      </Modal>
    );
  }
}


ModalCard.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  processingSubmit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRequestOk: PropTypes.func.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
  hideOkButton: PropTypes.bool,
  hideCancelButton: PropTypes.bool,
};

ModalCard.defaultProps = {
  okText: 'ok',
  cancelText: 'cancel',
  text: null,
  title: null,
  children: null,
  processingSubmit: false,
  hideOkButton: false,
  hideCancelButton: false,
};

const style = theme => ({
  root: {
  },
  modalCard: {
    margin: 'auto',
    maxWidth: '90%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  children: {
    display: 'flex',
    overflowY: 'scroll',
    // note
    // prob need to force scroll bars on osx https://stackoverflow.com/questions/7855590/preventing-scroll-bars-from-being-hidden-for-macos-trackpad-users-in-webkit-blin
  },
  cardContent: {
    display: 'flex',
  },
  backdrop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(style)(ModalCard);
