import React from 'react';
import BigIcon from '@material-ui/icons/DirectionsBus';
import LinkButton from '../view/components/LinkButton/LinkButton';

export default {
  title: 'Link Button',
};

export const InternalLink = () => <LinkButton to="/">Internal link</LinkButton>;
export const LinkWithIcon = () => (
  <LinkButton to="/">
    <BigIcon
      style={{
        marginRight: '4px',
      }}
    />
    Child with icon
  </LinkButton>
);
export const ExternalLink = () => <LinkButton to="https://ninjapixel.io">External link</LinkButton>;
