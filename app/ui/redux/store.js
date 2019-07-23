import { createStore } from 'redux';
import rootReducer from './reducers';

export const parcelStore = createStore(rootReducer);
