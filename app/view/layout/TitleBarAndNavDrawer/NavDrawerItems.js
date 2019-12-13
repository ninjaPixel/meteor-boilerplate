import React from 'react';
import _isEmpty from 'lodash/isEmpty';
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

import Lock from '@material-ui/icons/Lock';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountBox from '@material-ui/icons/AccountBox';

import routes from '../../../imports/modules/routes';
// import { useStoreUser } from '../../hooks/reduxSelectors';

const navLinkStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  text: {
    ...theme.typography.button,
    color: theme.palette.navDrawer.contrastText,
  },
  icon: {
    color: theme.palette.navDrawer.contrastText,
  },
}));
export const NavDrawerItem = props => {
  const classes = navLinkStyles();
  const { badgeContent, onNavClick, to, dataE2E, icon, text } = props;
  const navLink = (
    <li>
      <Link to={to} onClick={() => onNavClick()} className={classes.root}>
        <ListItem button data-e2e={dataE2E}>
          <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.text} noWrap>
                {text}
              </Typography>
            }
          />
        </ListItem>
      </Link>
    </li>
  );
  if (badgeContent) {
    return (
      <Badge color="primary" badgeContent={badgeContent}>
        {navLink}
      </Badge>
    );
  }
  return navLink;
};

// function ExternalNavLink(props) {
//   // eslint-disable-next-line react/prop-types
//   const { to, icon, text } = props;
//   return (
//     <Link target="_blank" to={to} className="Link--no-decoration">
//       <ListItem button>
//         <ListItemIcon>{icon}</ListItemIcon>
//         <ListItemText primary={text} />
//       </ListItem>
//     </Link>
//   );
// }

NavDrawerItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onNavClick: PropTypes.func, // .isRequired,
  icon: PropTypes.element.isRequired,
  dataE2E: PropTypes.string,
};

NavDrawerItem.defaultProps = {
  onNavClick: () => {},
};

// eslint-disable-next-line react/prop-types
const renderLoginLink = ({ onNavClick }) => (
  <NavDrawerItem to="/login" dataE2E="nav-login" text="Login" onNavClick={onNavClick} icon={<Lock />} />
);

const renderClientLinks = props => [
  <ListItem key="user-name">
    <ListItemText className={props.classes.listItemText} secondary={props.user.profile.name.first} key="user-name" />
  </ListItem>,
  <NavDrawerItem
    key="account"
    to={routes.account.getPath(props.user._id)}
    text="My account"
    onNavClick={props.onNavClick}
    icon={<AccountBox />}
  />,
  <NavDrawerItem key="logout-link" to="/logout" text="Logout" onNavClick={props.onNavClick} icon={<ExitToApp />} />,
];
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.navDrawer.main,
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
  listItemText: {
    userSelect: 'none',
  },
}));
const NavDrawerItems = props => {
  const classes = useStyles();
  const { onNavClick, links, user } = props;
  return (
    <div className={classes.root}>
      <List role="list" aria-label="Main navigation">
        {links.map(link => (
          <NavDrawerItem {...link} key={link.text} onNavClick={onNavClick} />
        ))}
        <Divider />
        {!_isEmpty(user) ? renderClientLinks({ ...props, classes, user }) : renderLoginLink({ ...props, user })}
      </List>
      {/*<List className={classes.legalSection}>*/}
      {/*  <NavLink icon={<Gavel />} to={routes.legal.getPath()} text="Legal" />*/}
      {/*</List>*/}
    </div>
  );
};

NavDrawerItems.propTypes = {
  onNavClick: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      dataE2E: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }),
  ).isRequired,
  user: PropTypes.object,
};

NavDrawerItems.defaultProps = {
  user: undefined,
};

export default NavDrawerItems;
