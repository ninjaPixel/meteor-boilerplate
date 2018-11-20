import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App/App';

// Meteor.startup(() => render(<App />, document.getElementById('react-root')));

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
