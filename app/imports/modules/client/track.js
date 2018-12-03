import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import convertToSterling from '../convertToSterling';

import userTools from '../userTools';

/*
  ---GOOGLE ANALYTICS EVENTS---
  Field Name  	  Type	  Required	Description
  eventCategory 	text	  yes	      Typically the object that was interacted with (e.g. 'Video')
  eventAction	    text	  yes	      The type of interaction (e.g. 'play')
  eventLabel	    text	  no	      Useful for categorizing events (e.g. 'Fall Campaign')
  eventValue	    integer	no	      A numeric value associated with the event (e.g. 42)
 */

const identify = (user) => {
  if (window.FS) {
    try {
      const trackingObject = {
        mode_str: Meteor.settings.public.mode,
        id_str: user._id,
      };
      const displayName = userTools.name(user);
      const email = userTools.email(user);
      if (displayName) {
        trackingObject.displayName = displayName;
      }
      if (email) {
        trackingObject.email = email;
      }

      window.FS.identify(user._id, trackingObject);
    } catch (ex) {
      console.error('Unable to use FullStory', ex);
    }
  }
};

const gaTarget = `${Meteor.settings.public.appName}${Meteor.settings.public.mode}`; // the name assigned to this instantiation of the tracker
let _gaInitialised = false;

const initialiseGAIfRequired = () => {
  if (!_gaInitialised) {
    const gaId = _.get(Meteor.settings, 'public.google_analytics_id', null);
    if (gaId && window.ga) {
      window.ga('create', gaId, 'auto', gaTarget);
      window.ga(`${gaTarget}.send`, 'pageview');
      _gaInitialised = true;
    } else {
      // console.log('Could not init GA');
    }
  }
};

const trackFacebookEvent = (eventName, payload) => {
  if (window.fbq) {
    if (_.isEmpty(payload)) {
      window.fbq('track', eventName);
    } else {
      window.fbq('track', eventName, payload);
    }
  }
};

const pageView = (page) => {
  initialiseGAIfRequired();
  if (window.ga) {
    window.ga(`${gaTarget}.set`, 'page', page);
    window.ga(`${gaTarget}.send`, 'pageview');
  }
};

const trackGoogleEvent = ({ eventCategory, eventAction, eventLabel, eventValue, hitType = 'event' }) => {
  initialiseGAIfRequired();
  if (window.ga) {
    window.ga(`${gaTarget}.send`, {
      hitType,
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
    });
  }
};

const lead = (eventCategory) => {
  trackFacebookEvent('Lead');
  trackGoogleEvent({
    eventCategory,
    eventAction: 'lead',
  });
};

const completeRegistration = (eventCategory) => {
  trackFacebookEvent('CompleteRegistration');
  trackGoogleEvent({
    eventCategory,
    eventAction: 'completeRegistration',
  });
};

const completeInitialSetup = (totalSteps, eventCategory) => {
  trackGoogleEvent({
    eventCategory,
    eventAction: 'completeInitialSetup',
    eventLabel: 'total-steps',
    eventValue: totalSteps,
  });
};

const initiateCheckout = (planName, amount, currencyCode, eventCategory) => {
  trackFacebookEvent('InitiateCheckout');
  trackGoogleEvent({
    eventCategory,
    eventAction: 'initiateCheckout',
    eventLabel: planName,
    eventValue: convertToSterling(amount, currencyCode),
  });
};

const purchase = (planName, amount, currencyCode, eventCategory) => {
  trackFacebookEvent('Purchase', { value: (amount / 100).toString(), currency: currencyCode.toUpperCase() });
  trackGoogleEvent({
    eventCategory,
    eventAction: 'purchase[value-is-gbp]',
    eventLabel: planName,
    eventValue: convertToSterling(amount, currencyCode),
  });
};

export default {
  pageView,
  lead,
  identify,
  completeRegistration,
  purchase,
  initiateCheckout,
  completeInitialSetup,
};
