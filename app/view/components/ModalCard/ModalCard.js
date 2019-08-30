import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading';

const propTypes = {
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

const defaultProps = {
  okText: 'ok',
  cancelText: 'cancel',
  text: null,
  title: null,
  children: null,
  processingSubmit: false,
  hideOkButton: false,
  hideCancelButton: false,
};
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
    return <div className={classes.children}>{children}</div>;
  }

  render() {
    const {
      classes,
      okText,
      cancelText,
      title,
      text,
      show,
      children,
      processingSubmit,
      hideOkButton,
      hideCancelButton,
    } = this.props;
    return (
      <Modal
        classes={{
          root: classes.root,
        }}
        open={show}
        onClose={this.handleCloseRequest}
        className={classes.backdrop}
      >
        <Card className={classes.modalCard} data-e2e="modal-card">
          <CardContent className={classes.cardContent}>
            {title ? (
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            ) : null}
            {text ? <Typography>{text}</Typography> : null}
            {this.renderChildren()}
          </CardContent>
          <CardActions>
            {hideOkButton ? null : (
              <Button data-e2e="modal-confirm" size="small" onClick={this.handleSubmit} disabled={processingSubmit}>
                {okText}
              </Button>
            )}
            {hideCancelButton ? null : (
              <Button
                data-e2e="modal-cancel"
                size="small"
                onClick={this.handleCloseRequest}
                disabled={processingSubmit}
              >
                {cancelText}
              </Button>
            )}
          </CardActions>
          {processingSubmit ? <Loading linear /> : null}
        </Card>
      </Modal>
    );
  }
}

ModalCard.propTypes = propTypes;

ModalCard.defaultProps = defaultProps;

const style = theme => ({
  root: {
    display: 'flex',
  },
  modalCard: {
    // margin: 'auto',
    maxWidth: '90%',
    minWidth: '40%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  children: {
    display: 'flex',
    maxHeight: '80vh',
    overflowY: 'scroll',
    // note
    // prob need to force scroll bars on osx
    // eslint-disable-next-line max-len
    // https://stackoverflow.com/questions/7855590/preventing-scroll-bars-from-being-hidden-for-macos-trackpad-users-in-webkit-blin
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  backdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withStyles(style)(ModalCard);
