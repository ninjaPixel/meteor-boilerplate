import React from 'react';
import { useStoreSnacks } from '../../hooks/reduxSelectors';
import SnackbarConnected from '../Snackbar/SnackbarConnected';

const Snacks = () => {
  const snackList = useStoreSnacks();
  return snackList.map(snack => <SnackbarConnected key={snack._id} {...snack} />);
};

export default Snacks;
