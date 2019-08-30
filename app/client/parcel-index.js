import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../view/App';
import { devStore } from '../controller/store';

const store = devStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('render-target'),
);

module.hot.accept();
