/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import LinkComponent from '../../components/Link/Link';
import InlineCode from '../../components/InlineCode/InlineCode';
import { documentLayoutStyle } from '../../styles/common';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(theme => ({
  root: {
    ...documentLayoutStyle(theme),
  },
}));

const TypographyScreen = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography component="span">
        This app uses the Material UI component library. The look and feel is configured in{' '}
        <InlineCode>app/view/styles/theme.js</InlineCode>. For a detailed look at theming, check out the{' '}
        <LinkComponent to="https://material-ui.com/customization/themes/#api" target="_blank">
          Material UI Theme docs
        </LinkComponent>
        . Although the default values adhere to the Material Design guidelines, your app doesn't have to feel Google-y
        at all since the theme is totally configurable.
      </Typography>
      <Typography>
        Individual components are styled using JSS. You should create the JSS classes you need to style your components
        within the actual component's file. This nicely encapsulates your styling and means that you can safely modify
        style rules without knowing if it'll affect other components (a common problem when using regular CSS).
      </Typography>
      <Typography>
        There are some common styling rules defined in <InlineCode>app/view/styles/common.js</InlineCode>, which you can
        import into your own component's JSS.
      </Typography>
    </div>
  );
};

TypographyScreen.propTypes = propTypes;

TypographyScreen.defaultProps = defaultProps;

export default TypographyScreen;
