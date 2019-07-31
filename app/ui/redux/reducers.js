import _ from 'lodash';
import { ADD_NOTIFICATION, ADD_SNACK, SET_NOTIFICATIONS_READ } from './actionTypes';

const initialState = {
  snacks: [
    {
      time: new Date(),
      message: 'Hello 👋',
      error: false,
    },
  ],
  notifications: [],
};

const setReadNotificationsRead = (arrayOfNotificationIds, state) => {
  const clonedState = _.cloneDeep(state);
  arrayOfNotificationIds.forEach(_id => {
    _.find(clonedState.notifications, { _id }).notificationSeen = true;
  });
  return clonedState;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS_READ:
      return setReadNotificationsRead(action.ids, state);
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    default:
      return state;
  }
}
