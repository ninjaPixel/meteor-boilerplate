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
* Email: Just hook-up your favourite SMTP provider 📧
* Developer friendly: you can use the `start:lite` cmd to just load the UI, for a snappy developer experience with Hot Module Reloading. It generally takes bout 50ms for a change to be built and loaded in the browser, which is about 3s quicker than if you were using
  the Meteor bundler (i.e. with `npm start`) 🤓
* λ functions: Execute intensive functions in the cloud, making sure that your node server is always free to fulfil client requests 😅


For some background information on the performance enhancements in this app, check out [this blog post](https://www.ninjapixel.io/meteor-bundle-size.html).

## Start Guide

Note that the `meteor` app lives in the `/app` directory. The root directory contains
some general setup, such as linting, and leaves space for including other items such as end-to-end
tests, a react native app and serverless functions.

### Installing dependencies

Use `npm` to install the dependencies. Note that there are a few `package.json` files in the project.

```bash
npm i
cd serverless
npm i
cd ../app
meteor npm i
```

### Starting the app

To run the full-blown app - front-end, back-end and MongoDB database, from the `app` directory run:

```bash
npm start
```

If you just want to work on the UI, then, from the `app` directory, you can run:
```bash
npm run start:lite
```

## λ functions

This projects uses Zeit Now to deploy and execute lambda functions.

Meteor runs a Node server; it is single threaded process and we want to make sure that
big computations don't grind the server to a halt. Hence the λ functions. Any big computations
should be sent to a λ function. The beauty of this is that we can spin up as many λ functions at
once and not need to even worry about scaling our app.

Dependencies for the serverless functions are defined in `serverless/package.json`. Make sure they are installed by running

    cd serverless
    npm install

### Running λ functions locally

You must first run the Now development environment:

From the `app` directory, you can use the shortcut
```bash
npm run now:dev
```

Or do it manually, from the `serverless` directory. Your choice.
```bash
now dev --local-config=development.now.json --port 8080
```

After which you are able to call those functions from your code. e.g.
```javascript
        HTTP.call(
          'POST',
          `${Meteor.settings.public.serverless_url}/lambdas/inc.js`,
          { data: { amount: 5 } },
          (err, res) => {
            if (err) {
              snacks.handleMethodError(err);
            } else {
              snacks.setMessage(res.content);
            }
          },
        );
```


### Using secrets with λ functions
Any secret keys that need to be available to your labmda functions can be
accessed through the node environment, e.g. `process.env.MONGO_URL`.

These keys are set in the relevant `.now.json` files.
For the dev environment (i.e. `dev.now.json`) you can just paste your secrets directly into the relevant `env` section of the file.
However, for live deployments, you need to create your secret with Now and then reference that secret from your `.now.json` file.
For example, if your production Google API key is "123xzy" then run the following to create a secret with Now:

```bash
now secret add production-google-api-key 123xyz
```

and then in your `production.now.json` file add a reference to it:

```bash
{
  "env": {
    "GOOGLE_API_KEY": "@production-google-api-key"
  }
}
```


### Deploying λ functions

Create an account with Zeit and [install the NOW desktop client or CLI](https://zeit.co/download). Then, from the `serverless` directory deploy
your lambda functions by running:

    now --local-config=production.now.json

#### Teams
Note that if you are a member of one or more teams, then you should
run the following before deploying, to make sure that you deploy 
to the correct team
```bash
now switch <team-slug|username>
```
