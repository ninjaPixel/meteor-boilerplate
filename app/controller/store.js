import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers/reducers';
import sagas from './sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
export const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
  ),
);

sagaMiddleware.run(sagas);
