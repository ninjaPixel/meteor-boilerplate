import _ from 'lodash';
import produce from 'immer';

import { ADD_NOTIFICATION, ADD_SNACK, CLOSE_SNACK, SET_NOTIFICATIONS_READ } from './actionTypes';

const initialState = {
  snacks: [],
  notifications: [],
};

/*
  This is the reducer used in 'lite' mode.
  It does not connect to the Meteor server.
 */
export function reducerLite(state = initialState, action) {
  /* eslint no-param-reassign:0 default-case:0 */
  return produce(state, draft => {
    switch (action.type) {
      case SET_NOTIFICATIONS_READ:
        action.payload._ids.forEach(_id => {
          _.find(draft.notifications, { _id }).notificationSeen = true;
        });
        break;
      case ADD_NOTIFICATION:
        draft.notifications = [action.payload, ...draft.notifications];
        break;
      case ADD_SNACK:
        draft.snacks = [action.payload, ...draft.snacks];
        break;
      case CLOSE_SNACK:
        _.find(draft.snacks, { _id: action.payload._id }).open = false;
        break;
    }
  });
}
