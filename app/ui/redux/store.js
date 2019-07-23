import { createStore } from 'redux';
import rootReducer from './reducers';

export const parcelStore = () =>
  createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const fullStore = () => {
  console.error('Not yet implemented to the full store');
};
