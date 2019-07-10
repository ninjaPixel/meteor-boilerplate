// import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

const name = user => {
  const profileName = _.get(user, 'profile.name', false);
  if (!profileName) {
    return 'n/a';
  }
  return `${profileName.first} ${profileName.last}`;
};

const email = user => _.get(user, 'emails[0].address', 'n/a');
const phone = user => _.get(user, 'profile.phone', 'n/a');

// const isSuperAdmin = user => Roles.userIsInRole(user._id, ['super-admin'], Roles.GLOBAL_GROUP);

const _notificationDefaults = {
  // Warning: do not change the names of these fields
  // N.B. the 'notify' prop acts as the default when a user's profile does not explicitly have a prop.
  // N.B. this object is saved under users.profile.notificationPreferences
  email: {
    marketing: true,
  },
};

const notificationPreference = (user, notification) => {
  /*
  If a preference is not explicitly declared in the user's notification preferences,
  then we assume the default preference. This is so that we can add new types of notifications
  without having to update the database every time with default preferences.
   */
  const notificationPreferences = _.get(user, 'profile.notificationPreferences', _notificationDefaults);
  let pref = _.get(notificationPreferences, notification, null);
  if (_.isNull(pref)) {
    pref = _.get(_notificationDefaults, notification, true);
  }
  return pref;
};

export default {
  name,
  email,
  phone,
  // isSuperAdmin,
  notificationPreference,
};
