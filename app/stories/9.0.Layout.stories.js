import React from 'react';
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs';
import ImportantDevices from '@material-ui/icons/ImportantDevices';
import ScreenContent from '../view/components/Screen/ScreenContent';
import ScreenContentWrapper from '../view/components/Screen/ScreenContentWrapper';
import { NavDrawerItem } from '../view/layout/TitleBarAndNavDrawer/NavDrawerItems';

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

export const NavItem = () => <NavDrawerItem to={'/'} icon={<ImportantDevices />} text={'Nav link'} />;

export const App = () => {};
