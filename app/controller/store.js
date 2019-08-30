import { createStore } from 'redux';
import { reducerLite } from './reducers/reducers';

export const devStore = () => {
  const store = createStore(reducerLite, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
};
export const fullStore = () => {
  console.error('Not yet implemented to the full store');
};
