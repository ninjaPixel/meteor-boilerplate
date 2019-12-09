import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import { defaultContentLayoutStyle, stackStyle } from '../../styles/common';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
  spacing: PropTypes.number,
};

const defaultProps = {
  spacing: 8,
};

const useStyles = makeStyles(theme => ({
  root: props => ({
    ...defaultContentLayoutStyle(theme),
    ...stackStyle(theme, props.spacing),
    border: '1px dashed #333',
  }),
}));

const ScreenContent = ({ children, spacing }) => {
  const classes = useStyles({ spacing });
  return <div className={classes.root}>{children}</div>;
};

ScreenContent.propTypes = propTypes;
ScreenContent.defaultProps = defaultProps;

export default ScreenContent;
