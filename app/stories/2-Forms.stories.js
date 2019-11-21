import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginFormComponent from '../view/components/LoginForm/LoginFormComponent';

export default {
  title: 'Forms',
};

export const loginForm = () => {
  return <LoginFormComponent />;
};
