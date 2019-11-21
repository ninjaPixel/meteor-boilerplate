import React from 'react';
import { action } from '@storybook/addon-actions';
import Typography from '@material-ui/core/Typography';
import ResponsivePaper from '../view/components/ResponsivePaper/ResponsivePaper';
import StoryWrapper from './StoryWrapper';

export default {
  title: 'Layouts',
};

export const responsivePaper = () => {
  return (
    <div>
      <StoryWrapper>
        <p>Container full width</p>
        <div style={{ border: '1px dotted white', padding: '8px' }}>
          <ResponsivePaper title="Component title">
            <Typography>
              When the container is wide enough, this component will split into a title and then a card. If the
              container is too narrow for this (think on a mobile) then the title and contents will be placed one after
              the other, without a card, for a simpler look.
            </Typography>
          </ResponsivePaper>
        </div>
        <p>Container width = 300px</p>
        <div style={{ width: '300px', border: '1px dotted white', padding: '8px' }}>
          <ResponsivePaper title="Component title">...contents</ResponsivePaper>
        </div>
      </StoryWrapper>
    </div>
  );
};
