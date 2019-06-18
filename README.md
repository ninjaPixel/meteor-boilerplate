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

## Serverless

This needs to be installed globally (it'd be nice to install it per project, but unfortunately it doesn't work like that)

        npm install -g serverless
        
### Set up credentials

Follow this [guide for setting up your AWS IAM credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

        serverless config credentials --provider aws --key 1234 --secret 5678 --profile boilerplate-serverless-admin
        
        serverless config credentials --provider aws --key 1234 --secret 5678 --profile boilerplate-serverless-agent
        
This will write your credentials to `~/.aws/credentials`.