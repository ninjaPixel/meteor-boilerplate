import { Meteor } from 'meteor/meteor';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Loading from '../../components/Loading/Loading';

class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true, errorMessage: '' };
  }

  componentDidMount() {
    const that = this;
    Meteor.logout((error) => {
      that.setState({ loading: false });
      if (error) {
        that.setState({ errorMessage: `There was a problem logging out. The message from the server was: ${error.reason}` });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading text="Logging out..." />);
    }

    if (this.state.errorMessage) {
      return (<Typography align="center" color="error">{this.state.errorMessage}</Typography>);
    }

    return (<div>
      <Typography variant="h5" align="center">You're now logged out.</Typography>
      {/*<br />*/}
      <Typography variant="h5" align="center">Stay safe out there <span role="img" aria-label="wave">👋</span>️</Typography>
    </div>);
  }
}


Logout.propTypes = {
  userId: PropTypes.string,
};

Logout.defaultProps = {
  userId: null,
};


export default Logout;
