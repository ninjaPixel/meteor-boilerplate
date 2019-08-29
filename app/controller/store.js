import { createStore } from 'redux';
import { reducerLite } from './reducers';

export const devStore = () =>
  createStore(reducerLite, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const fullStore = () => {
  console.error('Not yet implemented to the full store');
};
