import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import { SNACKBAR_TYPES } from '../view/components/Snackbar/constants';
import CustomizedSnackbar from '../view/components/Snackbar/Snackbar';

export default {
  title: 'Snackbar',
  decorators: [withKnobs],
};

const eventsFromNames = actions('onClose');

export const Snackbar = () => (
  <CustomizedSnackbar
    _id={1}
    message={text('message', 'This is a snackbar')}
    open
    variant={select('variant', SNACKBAR_TYPES, SNACKBAR_TYPES.success, 'variant')}
    {...eventsFromNames}
  />
);
