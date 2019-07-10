import React, { useState } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import App from '../ui/App';
import sampleNotificationData from '../ui/components/Notifications/sampleData';
import { StoreProvider } from '../ui/store/Store';

/*
  You can use Redux or whatever you want
  for state management here
*/

const initialState = {
  snacks: [
    {
      time: new Date(),
      message: 'Hello 👋',
      error: false,
    },
  ],
  notifications: sampleNotificationData,
};

const StoreComponent = () => {
  const [state, setState] = useState(initialState);
  const eventHandlers = {
    notifications: {
      setRead: arrayOfNotificationIds => {
        const clonedState = _.cloneDeep(state);
        arrayOfNotificationIds.forEach(_id => {
          _.find(clonedState.notifications, { _id }).notificationSeen = true;
        });
        setState(clonedState);
      },
    },
    setSnack: ({ message, error = false }) => {
      initialState.snacks.push({
        time: new Date(),
        message,
        error,
      });
    },
  };

  return (
    <StoreProvider state={state} eventHandlers={eventHandlers}>
      <App />
    </StoreProvider>
  );
};

render(<StoreComponent />, document.getElementById('render-target'));
