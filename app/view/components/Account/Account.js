import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import ResponsivePaper from '../ResponsivePaper/ResponsivePaper';
import { useStoreUser } from '../../hooks/reduxSelectors';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: undefined,
};

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    width: '100%',
  },
}));

const Account = props => {
  const { className } = props;
  const classes = useStyles();
  const user = useStoreUser();
  const rootClass = className || classes.root;
  return (
    <div className={rootClass}>
      <ResponsivePaper title="My details">
        <div>
          {user.profile.name.first} {user.profile.name.last}
        </div>
      </ResponsivePaper>
    </div>
  );
};

Account.propTypes = propTypes;

Account.defaultProps = defaultProps;

export default Account;
