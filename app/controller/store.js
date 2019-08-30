import { createStore } from 'redux';
import { reducer } from './reducers/reducers';

export const store = (lite = false) => {
  return createStore(reducer(lite), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};
