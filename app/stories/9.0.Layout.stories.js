import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text, number, boolean, object } from '@storybook/addon-knobs';
import ImportantDevices from '@material-ui/icons/ImportantDevices';
import Style from '@material-ui/icons/Style';
import Home from '@material-ui/icons/Home';
import ShortText from '@material-ui/icons/ShortText';
import UserFeedbackIcon from '@material-ui/icons/Vibration';
import ArchitectureIcon from '@material-ui/icons/Layers';
import ScreenContent from '../view/components/Screen/ScreenContent';
import ScreenContentWrapper from '../view/components/Screen/ScreenContentWrapper';
import NavDrawerItems, { NavDrawerItem } from '../view/layout/TitleBarAndNavDrawer/NavDrawerItems';
import routes from '../imports/modules/routes';

export default {
  title: 'Layout',
  decorators: [withKnobs],
};

export const Content = () => (
  <ScreenContent spacing={number('spacing', 5)}>
    <div
      style={{
        width: '100%',
        height: '300px',
        border: '4px solid #111',
      }}
    >
      The max width of the component is 640px (theme.spacing[15]).
    </div>
    <div
      style={{
        width: '50%',
        height: '200px',
        border: '4px solid #111',
      }}
    />

    <div
      style={{
        width: '640px',
        height: '400px',
        border: '4px solid #111',
      }}
    />
  </ScreenContent>
);

export const ContentWrapper = () => (
  <ScreenContentWrapper>
    <div>This should be centered.</div>
  </ScreenContentWrapper>
);

export const NavItem = () => <NavDrawerItem to={'/'} icon={<ImportantDevices />} text={text('text', 'Nav link')} />;

const navDrawerLinks = [
  { to: '/', text: 'Home', icon: <Home />, dataE2E: 'nav-page-home' },
  {
    to: '/',
    text: 'Style',

    icon: <Style />,
    dataE2E: `nav-page-${routes.styling.title}`,
  },
  {
    to: '/',
    text: 'Typography',

    icon: <ShortText />,
    dataE2E: `nav-page-${routes.typography.title}`,
  },
  {
    to: '/',
    text: 'Devices',

    icon: <ImportantDevices />,
    dataE2E: `nav-page-${routes.dynamicImports.title}`,
  },
  {
    to: '/',
    text: 'Feedback',

    icon: <UserFeedbackIcon />,
    dataE2E: `nav-page-${routes.userFeedback.title}`,
  },
  {
    to: '/',
    text: 'Architcture',

    icon: <ArchitectureIcon />,
    dataE2E: `nav-page-${routes.architecture.title}`,
  },
];

const eventsFromNames = actions('onNavClick');

export const NavDrawer = () => <NavDrawerItems {...eventsFromNames} links={navDrawerLinks} />;

export const NavDrawerLoggedIn = () => (
  <NavDrawerItems
    {...eventsFromNames}
    links={navDrawerLinks}
    user={object('user', { profile: { name: { first: 'Matt', last: 'Michel' } } }, 'user')}
  />
);
