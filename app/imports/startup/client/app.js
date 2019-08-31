import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';

import { App } from '../../../view/App';
import { store } from '../../../controller/store';

// todo subscribe to User collection

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('render-target'),
  );
});
