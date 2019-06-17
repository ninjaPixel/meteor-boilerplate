import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const defaultProps = {};

const FourOhFour = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.fourOhFour}>
        <img
          className={classes.fourOhFourImage}
          src="https://media.giphy.com/media/Ra4J7WCjmcnXW/giphy.gif"
          alt="404"
        />
        <Typography variant="h5">We don't recognise this link.</Typography>
        <Typography variant="h5">Check the URL, it looks like a typo.</Typography>
      </div>
    </div>
  );
};

FourOhFour.propTypes = propTypes;

FourOhFour.defaultProps = defaultProps;

const style = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  fourOhFour: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  fourOhFourImage: {
    paddingBottom: theme.spacing.unit * 3,
  },
});

export default withStyles(style)(FourOhFour);
