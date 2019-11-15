import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginFormComponent from '../view/components/LoginForm/LoginFormComponent';
import StoryWrapper from './StoryWrapper';

export default {
  title: 'Forms',
};

export const loginForm = () => {
  return (
    <StoryWrapper>
      <LoginFormComponent />
    </StoryWrapper>
  );
};
