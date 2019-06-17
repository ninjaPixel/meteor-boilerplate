import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import ImportantDevices from '@material-ui/icons/ImportantDevices';
import Lock from '@material-ui/icons/Lock';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountBox from '@material-ui/icons/AccountBox';
import Gavel from '@material-ui/icons/Gavel';
import ShortText from '@material-ui/icons/ShortText';
import { Link } from 'react-router-dom';
import routes from '../../../modules/routes';

function _NavLink(props) {
  const navLink = (
    <Link to={props.to} onClick={() => props.onNavClick()} className={props.classes.noDecoration}>
      <ListItem button data-e2e={props.dataE2E}>
        <ListItemIcon>{props.icon}</ListItemIcon>

        <ListItemText
          primary={
            <Typography variant="caption" noWrap>
              {props.text}
            </Typography>
          }
        />
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

const navLinkStyles = (theme) => ({
  noDecoration: {
    textDecoration: 'none',
    width: 'fit-content',
  },
});

const NavLink = withStyles(navLinkStyles)(_NavLink);

function ExternalNavLink(props) {
  return (
    <Link target="_blank" to={props.to} className="Link--no-decoration">
      <ListItem button>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onNavClick: PropTypes.func, // .isRequired,
  icon: PropTypes.element.isRequired,
  dataE2E: PropTypes.string,
};

NavLink.defaultProps = {
  onNavClick: () => {},
};

const renderLoginLink = (props) => (
  <NavLink to={'/login'} dataE2E="nav-login" text={'Login'} onNavClick={props.onNavClick} icon={<Lock />} />
);

const renderClientLinks = (props) => [
  <ListItem key="user-name">
    <ListItemText secondary={props.user.profile.name.first} key="user-name" />
  </ListItem>,
  <NavLink
    key="account"
    to={routes.account.getPath(props.user._id)}
    text={'My account'}
    onNavClick={props.onNavClick}
    icon={<AccountBox />}
  />,
  <NavLink key="logout-link" to={'/logout'} text={'Logout'} onNavClick={props.onNavClick} icon={<ExitToApp />} />,
];

const NavDrawerItems = (props) => {
  const links = [
    { to: '/', text: 'Home', onNavClick: props.onNavClick, icon: <Home />, dataE2E: 'nav-page-home' },
    {
      to: routes.dynamicLoading.getPath(),
      text: routes.dynamicLoading.title,
      onNavClick: props.onNavClick,
      icon: <ImportantDevices />,
      dataE2E: 'nav-page-1',
    },
    {
      to: routes.typography.getPath(),
      text: routes.typography.title,
      onNavClick: props.onNavClick,
      icon: <ShortText />,
      dataE2E: 'nav-page-2',
    },
  ];

  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        {links.map((link) => (
          <NavLink {...link} key={link.text} />
        ))}
        <Divider />
        {props.user ? renderClientLinks(props) : renderLoginLink(props)}
      </List>
      <List className={classes.legalSection}>
        <NavLink icon={<Gavel />} to={routes.legal.getPath()} text="Legal" />
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

const styles = (theme) => ({
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
