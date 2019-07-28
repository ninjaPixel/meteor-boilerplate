import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles';
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
import routes from '../../../imports/modules/newRoutes';

const navLinkStyles = makeStyles(theme => ({
  noDecoration: {
    textDecoration: 'none',
    width: 'fit-content',
    color: theme.palette.text.primary,
  },
}));
function _NavLink(props) {
  const classes = navLinkStyles();
  const { badgeContent, onNavClick, to, dataE2E, icon, text } = props;
  const navLink = (
    <Link to={to} onClick={() => onNavClick()} className={classes.noDecoration}>
      <ListItem button data-e2e={dataE2E}>
        <ListItemIcon>{icon}</ListItemIcon>

        <ListItemText primary={<Typography noWrap>{text}</Typography>} />
      </ListItem>
    </Link>
  );
  if (badgeContent) {
    return (
      <Badge color="primary" badgeContent={badgeContent}>
        {navLink}
      </Badge>
    );
  }
  return navLink;
}

const NavLink = _NavLink;

function ExternalNavLink(props) {
  // eslint-disable-next-line react/prop-types
  const { to, icon, text } = props;
  return (
    <Link target="_blank" to={to} className="Link--no-decoration">
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
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

// eslint-disable-next-line react/prop-types
const renderLoginLink = ({ onNavClick }) => (
  <NavLink to="/login" dataE2E="nav-login" text="Login" onNavClick={onNavClick} icon={<Lock />} />
);

const renderClientLinks = props => [
  <ListItem key="user-name">
    <ListItemText secondary={props.user.profile.name.first} key="user-name" />
  </ListItem>,
  <NavLink
    key="account"
    to={routes.account.getPath(props.user._id)}
    text="My account"
    onNavClick={props.onNavClick}
    icon={<AccountBox />}
  />,
  <NavLink key="logout-link" to="/logout" text="Logout" onNavClick={props.onNavClick} icon={<ExitToApp />} />,
];
const useStyles = makeStyles(theme => ({
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
}));
const NavDrawerItems = props => {
  const classes = useStyles();
  const { user, onNavClick } = props;
  const links = [
    { to: '/', text: 'Home', onNavClick, icon: <Home />, dataE2E: 'nav-page-home' },
    {
      to: routes.dynamicImports.getPath(),
      text: routes.dynamicImports.title,
      onNavClick,
      icon: <ImportantDevices />,
      dataE2E: `nav-page-${routes.dynamicImports.title}`,
    },
    {
      to: routes.typography.getPath(),
      text: routes.typography.title,
      onNavClick,
      icon: <ShortText />,
      dataE2E: `nav-page-${routes.dynamicImports.title}`,
    },
  ];

  return (
    <div className={classes.root}>
      <List>
        {links.map(link => (
          <NavLink {...link} key={link.text} />
        ))}
        <Divider />
        {user ? renderClientLinks(props) : renderLoginLink(props)}
      </List>
      {/*<List className={classes.legalSection}>*/}
      {/*  <NavLink icon={<Gavel />} to={routes.legal.getPath()} text="Legal" />*/}
      {/*</List>*/}
    </div>
  );
};

NavDrawerItems.propTypes = {
  onNavClick: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavDrawerItems.defaultProps = {
  user: null,
};

export default NavDrawerItems;
