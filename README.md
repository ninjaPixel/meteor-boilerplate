# Meteor Boilerplate

A fast and highly customisable Meteor.js boiler plate app.
The UI is handled by Material Design and the performance is achieved 
by selective tree-shaking and judicious use of dynamic imports, to
keep the client bundle as small as reasonably possible.

**>>> [View Demo](https://meteor.ninjapixel.io) <<<**


* Front end: [React](https://reactjs.org/) ✌️
* UI: [MUI](https://material-ui.com/) (Material Design) 🎨
* Bundle size: [<250kB gZipped](https://www.ninjapixel.io/meteor-bundle-size.html) 🐭
* Styling: [JSS](http://cssinjs.org/) 💅
* Security: Users, roles and groups 🔐


For some background information on the performance enhancements in this app, check out [this blog post](https://www.ninjapixel.io/meteor-bundle-size.html).

## Start Guide

Note that the `meteor` app lives in the `/app` directory. The root directory contains
some general setup, such as linting, and leaves space for including other items such as end-to-end
tests and a react native app.

```
cd app
meteor npm i
npm start
```

## λ functions

This projects uses Zeit Now to deploy and execute lambda functions.
Since Meteor runs a Node server, it is single threaded and we want to make sure that
big computations don't grind the server to a halt. Hence the λ functions. Any big computations
should be sent to a λ function. The beauty of this is that we can spin up as many λ functions at
once and not need to even worry about scaling our app.

Create an account with Zeit and [install the NOW desktop client or CLI](https://zeit.co/download). Then, from the `serverless` directory deploy
your lambda functions by running:

        now