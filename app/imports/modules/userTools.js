import _get from 'lodash/get';
import _isNull from 'lodash/isNull';

const name = user => {
  const profileName = _get(user, 'profile.name', false);
  if (!profileName) {
    return 'n/a';
  }
  return `${profileName.first} ${profileName.last}`;
};

const email = user => _get(user, 'emails[0].address', 'n/a');
const phone = user => _get(user, 'profile.phone', 'n/a');

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
  const notificationPreferences = _get(user, 'profile.notificationPreferences', _notificationDefaults);
  let pref = _get(notificationPreferences, notification, null);
  if (_isNull(pref)) {
    pref = _get(_notificationDefaults, notification, true);
  }
  return pref;
};

export default {
  name,
  email,
  phone,
  notificationPreference,
};
