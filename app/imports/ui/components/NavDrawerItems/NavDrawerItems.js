// import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles, Badge, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Code, Storage, AddShoppingCart, People, Business, AccountCircle, Lock, ExitToApp, Settings, DateRange, AccountBox, Gavel, HelpOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import routes from '../../../modules/routes';


function NavLink(props) {
  const navLink = (
    <Link to={props.to} onClick={() => props.onNavClick()} className="Link--no-decoration" >
      <ListItem button data-e2e={props.dataE2E}>
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
  if (props.badgeContent) {
    return (
      <Badge color="primary" badgeContent={props.badgeContent}>
        {navLink}
      </Badge>
    );
  }
  return navLink;
}
function ExternalNavLink(props) {
  return (
    <Link target="_blank" to={props.to} className="Link--no-decoration">
      <ListItem button >
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onNavClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  dataE2E: PropTypes.string,
};

const renderLoginLink = props => <NavLink to={'/login'} dataE2E="nav-login" text={'Login'} onNavClick={props.onNavClick} icon={<Lock />} />;


const renderClientLinks = props => [
  (<ListItem key="user-name"><ListItemText secondary={props.user.profile.name.first} key="user-name" /></ListItem>),
  <NavLink key="account" to={routes.account(props.user._id)} text={'My account'} onNavClick={props.onNavClick} icon={<AccountBox />} />,
  <NavLink key="logout-link" to={'/logout'} text={'Logout'} onNavClick={props.onNavClick} icon={<ExitToApp />} />,
];

const NavDrawerItems = (props) => {
  const links = [
    { to: '/page1', text: 'Page 1', onNavClick: props.onNavClick, icon: <AddShoppingCart />, dataE2E: 'nav-page-1' },
  ];

  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        {links.map(link => <NavLink {...link} key={link.text} />)}
        <Divider />
        {props.user ? renderClientLinks(props) : renderLoginLink(props)}
      </List>
      <List className={classes.legalSection}>
        <NavLink icon={<Gavel />} to={routes.legal} text="Legal" />
      </List>
    </div>
  );
};

NavDrawerItems.propTypes = {
  classes: PropTypes.object.isRequired,
  onNavClick: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavDrawerItems.defaultProps = {
  user: null,
};


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoContainer: {
    width: '100%',
    backgroundColor: 'black',
    background: '#000',
  },
  legalSection: {
    flex: 'none',
  },
});
export default withStyles(styles)(NavDrawerItems);
