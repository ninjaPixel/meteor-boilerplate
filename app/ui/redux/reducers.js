import _ from 'lodash';
import sampleNotificationData from '../components/Notifications/sampleData';
import { SET_NOTIFICATIONS_READ } from './actionTypes';

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

const setReadNotificationsRead = (arrayOfNotificationIds, state) => {
  const clonedState = _.cloneDeep(state);
  arrayOfNotificationIds.forEach(_id => {
    _.find(clonedState.notifications, { _id }).notificationSeen = true;
  });
  return clonedState;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS_READ:
      return setReadNotificationsRead(action.ids, state);
    default:
      return state;
  }
}
