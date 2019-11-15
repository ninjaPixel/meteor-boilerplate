import React from 'react';
import { action } from '@storybook/addon-actions';
import ResponsivePaper from '../view/components/ResponsivePaper/ResponsivePaper';
import StoryWrapper from './StoryWrapper';

export default {
  title: 'Layouts',
};

export const responsivePaper = () => {
  return (
    <div>
      <StoryWrapper>
        <div style={{ width: '300px' }}>
          <ResponsivePaper title="Container width = 300px">...contents</ResponsivePaper>
        </div>
      </StoryWrapper>
    </div>
  );
};
