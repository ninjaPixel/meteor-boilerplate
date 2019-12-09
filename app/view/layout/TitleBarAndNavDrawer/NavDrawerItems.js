import React from 'react';
import _ from 'lodash';
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
import Style from '@material-ui/icons/Style';
import ShortText from '@material-ui/icons/ShortText';
import UserFeedbackIcon from '@material-ui/icons/Vibration';
import ArchitectureIcon from '@material-ui/icons/Layers';
import routes from '../../../imports/modules/routes';
import { useStoreUser } from '../../hooks/reduxSelectors';

const navLinkStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  text: {
    ...theme.typography.button,
    color: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));
export const NavDrawerItem = props => {
  const classes = navLinkStyles();
  const { badgeContent, onNavClick, to, dataE2E, icon, text } = props;
  const navLink = (
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
  listItemText: {
    userSelect: 'none',
  },
}));
const NavDrawerItems = props => {
  const classes = useStyles();
  const user = useStoreUser();
  const { onNavClick } = props;
  const links = [
    { to: '/', text: 'Home', onNavClick, icon: <Home />, dataE2E: 'nav-page-home' },
    {
      to: routes.styling.getPath(),
      text: routes.styling.title,
      onNavClick,
      icon: <Style />,
      dataE2E: `nav-page-${routes.styling.title}`,
    },
    {
      to: routes.typography.getPath(),
      text: routes.typography.title,
      onNavClick,
      icon: <ShortText />,
      dataE2E: `nav-page-${routes.typography.title}`,
    },
    {
      to: routes.dynamicImports.getPath(),
      text: routes.dynamicImports.title,
      onNavClick,
      icon: <ImportantDevices />,
      dataE2E: `nav-page-${routes.dynamicImports.title}`,
    },
    {
      to: routes.userFeedback.getPath(),
      text: routes.userFeedback.title,
      onNavClick,
      icon: <UserFeedbackIcon />,
      dataE2E: `nav-page-${routes.userFeedback.title}`,
    },
    {
      to: routes.architecture.getPath(),
      text: routes.architecture.title,
      onNavClick,
      icon: <ArchitectureIcon />,
      dataE2E: `nav-page-${routes.architecture.title}`,
    },
  ];

  return (
    <div className={classes.root}>
      <List>
        {links.map(link => (
          <NavDrawerItem {...link} key={link.text} />
        ))}
        <Divider />
        {!_.isEmpty(user) ? renderClientLinks({ ...props, classes, user }) : renderLoginLink({ ...props, user })}
      </List>
      {/*<List className={classes.legalSection}>*/}
      {/*  <NavLink icon={<Gavel />} to={routes.legal.getPath()} text="Legal" />*/}
      {/*</List>*/}
    </div>
  );
};

NavDrawerItems.propTypes = {
  onNavClick: PropTypes.func.isRequired,
};

NavDrawerItems.defaultProps = {};

export default NavDrawerItems;
