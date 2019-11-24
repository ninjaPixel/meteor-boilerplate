import React from 'react';
import Typography from '@material-ui/core/Typography';
import ResponsivePaper from '../view/components/ResponsivePaper/ResponsivePaper';

export default {
  title: 'Responsive Paper',
};
export const responsivePaper = () => (
  <ResponsivePaper title="Component title">
    <Typography>
      When the container is wide enough, this component will split into a title and then a card. If the container is too
      narrow for this (think on a mobile) then the title and contents will be placed one after the other, without a
      card, for a simpler look.
    </Typography>
  </ResponsivePaper>
);
