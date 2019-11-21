import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import StoryWrapper from '../stories/StoryWrapper';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const ReduxAndThemeDecorator = storyFn => <StoryWrapper>{storyFn()}</StoryWrapper>;
addDecorator(ReduxAndThemeDecorator);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
});

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
