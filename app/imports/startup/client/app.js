import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../../view/App';

// todo subscribe to User collection

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
