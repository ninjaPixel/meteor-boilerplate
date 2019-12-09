import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../view/components/Link/Link';

export default {
  title: 'Link',
};

export const Text = () => (
  <Typography component="div">
    <Link to="/">Some link</Link>
  </Typography>
);
