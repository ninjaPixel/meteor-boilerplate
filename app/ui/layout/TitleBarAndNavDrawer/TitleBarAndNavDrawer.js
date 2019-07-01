import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

const propTypes = {
  children: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool,
  hideNavigation: PropTypes.bool,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  screenTitle: PropTypes.string,
  user: PropTypes.object,
};
const defaultProps = {
  fullScreen: false,
  hideNavigation: false,
  loading: false,
  screenTitle: '',
  user: null,
};

const TitleBarAndNavDrawer = props => {
  const { children, user, fullScreen, history } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = styles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderCloseIcon = () => {
    if (!fullScreen) {
      return null;
    }
    return (
      <IconButton
        color="inherit"
        aria-label="go back"
        onClick={() => {
          history.goBack();
        }}
      >
        <CloseIcon />
      </IconButton>
    );
  };

  return <div className={classes.root}>{children}</div>;
};

TitleBarAndNavDrawer.propTypes = propTypes;

TitleBarAndNavDrawer.defaultProps = defaultProps;

export default TitleBarAndNavDrawer;
