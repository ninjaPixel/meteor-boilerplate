import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HMRApp } from '../view/App';
import { store } from '../controller/store';

render(
  <Provider store={store}>
    <HMRApp />
  </Provider>,
  document.getElementById('render-target'),
);

if (module.hot) {
  module.hot.accept();
}
