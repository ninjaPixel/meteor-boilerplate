import React, { useState } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../ui/App';
import { parcelStore } from '../ui/redux/store';

const store = parcelStore;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('render-target'),
);
