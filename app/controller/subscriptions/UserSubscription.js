import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { actionUserChangePublished } from '../actions';

const propTypes = {
  user: PropTypes.object,
  ready: PropTypes.bool,
};
const defaultProps = {
  user: undefined,
  ready: undefined,
};

const UserSubscription = props => {
  const { user, ready } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    actionUserChangePublished({ dispatch, user, ready });
  }, [user, ready]);

  return null;
};

UserSubscription.propTypes = propTypes;

UserSubscription.defaultProps = defaultProps;

export default withTracker(() => {
  const userId = Meteor.userId();
  let handle = {
    ready: () => false,
  };
  if (userId) {
    handle = Meteor.subscribe('users.one', userId);
  }
  const user = Meteor.users.findOne({ _id: userId }) || Meteor.user();
  const ready = (Roles.subscription.ready() && !userId) || (handle.ready() && Roles.subscription.ready());
  return {
    ready,
    user,
  };
})(UserSubscription);
