import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


const userIsSuperAdmin = userId => Roles.userIsInRole(userId, ['super-admin'], Roles.GLOBAL_GROUP);


/*
    If you don't supply an error code && error message, then this function
    will output false if the check fails.
    Otherwise, it will throw an error if the check fails
 */

const userCanEditThisUserProfile = ({ userId, targetUserId, errorCode, errorMessage }) => {
  if (targetUserId !== userId) {
    if (!userIsSuperAdmin(userId)) {
      if (errorCode && errorMessage) {
        throw new Meteor.Error(errorCode, errorMessage);
      }
      return false;
    }
  }
  return true;
};


export default {
  user: {
    canEditThisProfile: userCanEditThisUserProfile,
    isSuperAdmin: userIsSuperAdmin,

  },
};
