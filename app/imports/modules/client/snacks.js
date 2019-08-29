import _ from 'lodash';
import reactiveState from '../../../model/api/State/client/reactiveState';

const set = ({ message }) => {
  if (!_.isUndefined(message)) {
    reactiveState.snack.message.set(message);
    reactiveState.snack.time.set(new Date().getTime());
  }
};

const setMessage = message => {
  set({ message });
};

const handleMethodError = (error, prependedText = '') => {
  if (_.get(error, 'reason', false)) {
    set({ message: `❗ ${prependedText} ${error.reason}` });
    console.warn(error);
  }
};

const clear = () => {
  set({ message: '' });
};

export default {
  set,
  setMessage,
  handleMethodError,
  clear,
};
