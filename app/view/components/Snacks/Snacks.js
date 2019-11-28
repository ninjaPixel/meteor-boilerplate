import React from 'react';
import { useStoreSnacks } from '../../hooks/reduxSelectors';
import Snackbar from '../Snackbar/Snackbar';

const Snacks = () => {
  const snackList = useStoreSnacks();
  return snackList.map(snack => <Snackbar key={snack._id} {...snack} />);
};

export default Snacks;
