import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'loki/configure-react';
import { withA11y } from '@storybook/addon-a11y';
import StoryWrapper from '../stories/StoryWrapper';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { storyBookTheme } from './theme';

addDecorator(withA11y);

const ReduxAndThemeDecorator = storyFn => <StoryWrapper>{storyFn()}</StoryWrapper>;
addDecorator(ReduxAndThemeDecorator);

const customViewports = {
  MDPI: {
    name: 'MDPI Laptop',
    styles: {
      width: '1200px',
      height: '800px',
    },
  },
  crapTop: {
    name: 'Craptop',
    styles: {
      width: '800px',
      height: '600px',
    },
  },
};
addParameters({
  grid: { cellSize: 8 },
  options: {
    theme: storyBookTheme,
  },
  viewport: {
    viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
    defaultViewport: 'crapTop',
  },
  backgrounds: [
    // The actual MUI dark bg is #242424 but this doesn't render correctly in Storybook
    // using #333 renders (almost) as #242424.
    { name: 'MUI Dark', value: '#333' },
    { name: 'MUI Light', value: '#fff' },
  ],
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
