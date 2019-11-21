import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers/reducers';
import loginFormSagas from './sagas/loginForm';
import logoutSagas from './sagas/logOut';

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

sagaMiddleware.run(loginFormSagas);
sagaMiddleware.run(logoutSagas);
