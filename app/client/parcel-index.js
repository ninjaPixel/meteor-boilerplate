import React from 'react';
import { render } from 'react-dom';
import App from '../ui/App';

const state = {
  snack: {
    time: new Date(),
    message: 'Hello 👋',
    error: false,
  },
};

const events = {
  setSnack: ({ message, error = false }) => {
    state.snack = {
      time: new Date(),
      message,
      error,
    };
  },
};

const props = {
  state,
  events,
};

render(<App {...props} />, document.getElementById('render-target'));
