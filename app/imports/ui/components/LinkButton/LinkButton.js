import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import reactiveState from '../../../api/State/client/reactiveState';

const _button = (props) => {
  const { text, icon, linkClassName, target, delayed, ...rest } = props;
  // pull out 'target' and 'linkClassName' so it's not part of rest
  if (icon) {
    return <IconButton icon={icon} text={text} {...rest} />;
  }
  return <Button {...rest}>{text}</Button>;
};

const LinkButton = (_props) => {
  const { match, location, history, staticContext, ...props } = _props;
  const { to, target, linkClassName, delayed } = props;

  if (props.disabled) {
    return _button(props);
  }
  const cssClass = classNames({
    [linkClassName]: linkClassName,
    'Link--no-decoration': true,
  });

  if (target) {
    return (
      <Link target={target} to={to} className={cssClass}>
        {_button(props)}
      </Link>
    );
  }

  if (to.includes('://')) {
    return (
      <a href={to} className={cssClass}>
        {_button(props)}
      </a>
    );
  }

  if (delayed) {
    /*
      This will switch the UI to a loading screen, before a new route is rendered.
      Usefull when you don't want the UI to freeze when navigating to an intensive route
     */
    const onClick = () => {
      reactiveState.loading.set(true);
      _.delay(() => {
        history.push(to);
        reactiveState.loading.set(false);
      }, 30);
    };
    return (
      <div onClick={onClick} className={cssClass}>
        {_button(props)}
      </div>
    );
  }
  return (
    <Link to={to} className={cssClass}>
      {_button(props)}
    </Link>
  );
};

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
  linkClassName: PropTypes.string,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  delayed: PropTypes.bool,
  color: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.func,
};

LinkButton.defaultProps = {
  linkClassName: null,
  variant: 'contained',
  color: 'secondary',
  disabled: false,
  icon: null,
  target: null,
  delayed: false,
};

const styles = {};

export default withStyles(styles)(withRouter(LinkButton));
