import _ from 'lodash';
import produce from 'immer';

import { ADD_NOTIFICATION, ADD_SNACK, CLOSE_SNACK, SET_NOTIFICATIONS_READ } from './actionTypes';

const initialState = {
  snacks: [],
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
      return setReadNotificationsRead(action.payload._ids, state);
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case ADD_SNACK:
      return {
        ...state,
        snacks: [action.payload, ...state.snacks],
      };
    case CLOSE_SNACK:
      return {
        ...state,
        snacks: state.snacks.filter(snack => snack._id !== action.payload._id),
      };
    default:
      return state;
  }
}
