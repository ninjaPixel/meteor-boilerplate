import React from 'react';
import { withKnobs, text, select, number, boolean } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';
import Loading from '../view/components/Loading/Loading';

export default {
  title: 'Loading',
  decorators: [withKnobs],
};

const eventsFromNames = actions('onClose');

export const Snackbar = () => (
  <Loading linear={boolean('linear', true)} size={number('size', 100)}>
    {text('children (string)', '')}
  </Loading>
);
