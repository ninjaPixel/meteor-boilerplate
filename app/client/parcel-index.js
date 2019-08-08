import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../ui/App';
import { devStore } from '../ui/redux/store';

const store = devStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('render-target'),
);
