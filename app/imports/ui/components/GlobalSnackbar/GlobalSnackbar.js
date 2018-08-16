import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import reactiveState from '../../../api/State/client/reactiveState';
import Snackbar from '../../components/Snackbar/Snackbar';


class GlobalSnackbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.snack.time !== this.props.snack.time) {
      this.setState({ open: true });
    }
  }

  onClose() {
    this.setState({ open: false });
  }

  render() {
    const { snack } = this.props;
    const { open } = this.state;

    return (
      <div data-e2e="global-snack">
        {(_.isEmpty(snack) || snack.message === '') ? null : <Snackbar text={snack.message} requestClose={this.onClose} open={open} />}
      </div>
    );
  }
}


GlobalSnackbar.propTypes = {
  snack: PropTypes.object,
};

GlobalSnackbar.defaultProps = {
  snack: {},
};


export default withTracker(() => {
  const snack = {
    message: reactiveState.snack.message.get(),
    time: reactiveState.snack.time.get(),
  };
  return {
    snack,
  };
},
)(GlobalSnackbar);

