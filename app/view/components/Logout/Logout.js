import React, { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import { useStoreUser } from '../../hooks/reduxSelectors';
import { actionAccountLogOut } from '../../../controller/actions';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const Logout = props => {
  const { className } = props;
  const dispatch = useDispatch();
  const user = useStoreUser();
  const classes = useStyles();

  useEffect(() => {
    if (!_.isEmpty(user)) {
      actionAccountLogOut({ dispatch });
    }
  }, []);

  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <Typography>
        You're all logged out. Stay safe out there{' '}
        <span role="img" aria-label="wave goodbye">
          👋
        </span>
      </Typography>
    </div>
  );
};

Logout.propTypes = propTypes;

Logout.defaultProps = defaultProps;

export default Logout;
