import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/Loading/Loading';
import { middleOfScreenStyle } from '../../styles/root';

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
        that.setState({
          errorMessage: `There was a problem logging out. The message from the server was: ${error.reason}`,
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <div className={classes.root}>
          <Loading text="Logging out..." />
        </div>
      );
    }

    if (this.state.errorMessage) {
      return (
        <div className={classes.root}>
          <Typography align="center" color="error">
            {this.state.errorMessage}
          </Typography>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Typography variant="h5" align="center">
          You're now logged out.
        </Typography>
        {/*<br />*/}
        <Typography variant="h5" align="center">
          Stay safe out there{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
          ️
        </Typography>
      </div>
    );
  }
}

Logout.propTypes = {
  userId: PropTypes.string,
};

Logout.defaultProps = {
  userId: null,
};

const style = (theme) => ({
  root: middleOfScreenStyle(theme),
});
export default withStyles(style)(Logout);
