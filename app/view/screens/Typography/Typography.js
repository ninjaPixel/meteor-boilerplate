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
        Check out the{' '}
        <LinkComponent to="https://material-ui.com/components/typography/#typography" target="_blank">
          Material UI Typography docs
        </LinkComponent>{' '}
        to get an idea of how to use the <InlineCode> Typography</InlineCode> component.
      </Typography>
      <Typography>
        You can modify the default typography settings in <InlineCode>app/view/styles/theme.js</InlineCode>. Here, you
        can also change the font. Note that you will also need to load this font in the document head.
      </Typography>
      <Typography>
        Note that often you will want an item to semantically be a H1 (i.e. you set{' '}
        <InlineCode>variant="h1"</InlineCode>) but this results in an element that is far too large for your needs. In
        this instance, override the styling by passing in your own <InlineCode>className</InlineCode> prop.
      </Typography>
      <Typography>
        The <InlineCode>Typography</InlineCode> component is a block element, you can make it inline by passing the prop{' '}
        <InlineCode>component="span"</InlineCode>. This is also a useful technique if you need to nest{' '}
        <InlineCode>Typography</InlineCode> elements inside other <InlineCode>Typography</InlineCode> elements (e.g. you
        want to include an inline <InlineCode>Link</InlineCode>, among a block of text) as it changes the component from
        a P element to a span.
      </Typography>
      <Typography>
        One really neat feature in this boilerplate is that the ratio of font sizes between different elements (
        <InlineCode>h1</InlineCode>, <InlineCode>h2</InlineCode>, ... <InlineCode>p</InlineCode>) reduces as the screen
        size gets smaller ✌️. See the MUI docs on{' '}
        <LinkComponent to={'https://material-ui.com/customization/theming/#responsivefontsizes-theme-options-theme'}>
          responsive font sizes
        </LinkComponent>{' '}
        for more details.
      </Typography>
    </div>
  );
};

TypographyScreen.propTypes = propTypes;

TypographyScreen.defaultProps = defaultProps;

export default TypographyScreen;
