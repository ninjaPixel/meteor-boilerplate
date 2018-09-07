import { Meteor } from 'meteor/meteor';

export default ({ methods, limit, timeRange, type = 'method' }) => {
  if (Meteor.isServer) {
    import('meteor/ddp-rate-limiter').then(({ default: DDPRateLimiter }) => {
      methods.forEach((methodName) => {
        DDPRateLimiter.DDPRateLimiter.addRule({
          type,
          name: methodName,
          connectionId() { return true; },
        }, limit, timeRange * 1000);
      });
    });
  }
};
