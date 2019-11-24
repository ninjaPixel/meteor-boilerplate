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
import { TYPE_SCALE } from '../../styles/constants';

const propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  processingSubmit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onRequestOk: PropTypes.func.isRequired,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
  hideOkButton: PropTypes.bool,
  hideCancelButton: PropTypes.bool,
};

const defaultProps = {
  okText: 'ok',
  cancelText: 'cancel',
  title: null,
  children: null,
  processingSubmit: false,
  hideOkButton: false,
  hideCancelButton: false,
};
class ModalCard extends React.PureComponent {
  constructor(props) {
    super(props);
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
      show,
      processingSubmit,
      hideOkButton,
      hideCancelButton,
      children,
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
          {title ? (
            <Typography className={classes.title} variant="h1" gutterBottom>
              {title}
            </Typography>
          ) : null}
          <CardContent className={classes.cardContent}>{children}</CardContent>
          <CardActions className={classes.cardActions}>
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
          {processingSubmit ? <Loading linear className={classes.loading} /> : null}
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
    maxWidth: theme.spacing(14),
    minWidth: '40%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: theme.spacing(3),
  },
  title: {
    ...TYPE_SCALE.XL3,
    marginTop: 0,
    padding: theme.spacing(0, 3),
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    maxHeight: '80%',
    overflowY: 'scroll',
    padding: theme.spacing(0, 3),
  },
  cardActions: {
    padding: theme.spacing(1, 3),
  },
  backdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    // height: theme.spacing(4),
  },
});

export default withStyles(style)(ModalCard);
