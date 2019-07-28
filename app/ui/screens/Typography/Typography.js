import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import LinkComponent from '../../Link/Link';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const TypographyScreen = props => {
  const { className } = props;
  const classes = useStyles();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography variant="h1">Typography</Typography>
      <Typography>
        We use{' '}
        <LinkComponent to="https://material-ui.com/components/typography/#typography" target="_blank">
          Material UI
        </LinkComponent>
        . Go <LinkComponent to="/">home</LinkComponent>.
      </Typography>
    </div>
  );
};

TypographyScreen.propTypes = propTypes;

TypographyScreen.defaultProps = defaultProps;

export default TypographyScreen;
