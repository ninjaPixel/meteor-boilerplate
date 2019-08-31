import { createStore } from 'redux';
import { reducer } from './reducers/reducers';

export const store = () => {
  return createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
