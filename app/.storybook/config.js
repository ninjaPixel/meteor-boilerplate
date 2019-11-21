import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import StoryWrapper from '../stories/StoryWrapper';

const styles = {
  textAlign: 'center',
};
const ReduxAndThemeDecorator = storyFn => <StoryWrapper>{storyFn()}</StoryWrapper>;
addDecorator(ReduxAndThemeDecorator);
// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
