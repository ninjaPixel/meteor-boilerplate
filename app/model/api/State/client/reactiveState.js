import { ReactiveVar } from 'meteor/reactive-var';

const reactiveSnack = new ReactiveVar('');
const reactiveSnackTime = new ReactiveVar(0);
const screenTitle = new ReactiveVar('');
const loading = new ReactiveVar(false);

export default {
  snack: { message: reactiveSnack, time: reactiveSnackTime },
  screenTitle,
  loading,
};
