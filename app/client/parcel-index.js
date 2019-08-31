import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HMRApp } from '../view/App';
import { store } from '../controller/store';

const reduxStore = store();

render(
  <Provider store={reduxStore}>
    <HMRApp />
  </Provider>,
  document.getElementById('render-target'),
);

module.hot.accept();
