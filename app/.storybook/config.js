import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import 'loki/configure-react';
import StoryWrapper from '../stories/StoryWrapper';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const ReduxAndThemeDecorator = storyFn => <StoryWrapper>{storyFn()}</StoryWrapper>;
addDecorator(ReduxAndThemeDecorator);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
  grid: { cellSize: 8 },
  backgrounds: [
    // The actual MUI dark bg is #242424 but this doesn't render correctly in Storybook
    // using #333 renders (almost) as #242424.
    { name: 'MUI Dark', value: '#333', default: true },
    { name: 'MUI Light', value: '#fff' },
  ],
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
