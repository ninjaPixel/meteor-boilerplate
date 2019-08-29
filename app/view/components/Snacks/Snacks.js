import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreSnacks } from '../../hooks/reduxSelectors';
import Snackbar from '../Snackbar/Snackbar';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Snacks = props => {
  const { className } = props;
  const classes = useStyles();
  const snackList = useStoreSnacks();
  return snackList.map(snack => <Snackbar key={snack._id} {...snack} />);
};

export default Snacks;
