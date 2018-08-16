import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeferredComponent from '../../components/DeferredComponent/DeferredComponent';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';
import AppRoute from '../../components/AppRoute/AppRoute';
import LoadingComponent from '../../components/Loading/Loading';

import './App.scss';

const HomeScreen = props => (
  <div>
    <header>
      <h1>Home screen</h1>
    </header>
    <p>
      Some text...
    </p></div>
);


class App extends Component {
  paths() {
    const { user, userId } = this.props;
    const props = { user, userId };
    // having a key on each route ensures that the DeferredComponent updates between route changes, between deferred components.
    return [
      <AppRoute key="/" path="/" exact title="Hello, World!" component={HomeScreen} {...props} />,
      <AppRoute key="/page1" path="/page1" title="Page 1 - Dynamically Loaded 😎" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Page1/Page1.js')} name="Meteor developer" {...props} />,
      <AppRoute key="/page2" path="/page2" title="Page 2 - Dynamically Loaded 🚀" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Page2/Page2.js')} {...props} />,
      <AppRoute key="/login" path="/login" title="Login" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Login/Login.js')} {...props} />,
      <AppRoute key="/logout" path="/logout" title="Logout" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Logout/Logout.js')} {...props} />,
      <AppRoute key="/legal" path="/legal" title="Legal" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Legal/Legal.js')} {...props} />,
      <AppRoute key="/account" path="/account/:userId" title="Account" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Account/Account.js')} {...props} />,
    ];
  }

  render() {
    const { user } = this.props;
    return (
      <Router>
        <div className="App">
          <CssBaseline />
          <TitleBarAndNavDrawer user={user}>
            <Switch>{this.paths()}</Switch>
          </TitleBarAndNavDrawer>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  const userId = Meteor.userId();
  let handle = { ready() { return true; } };
  if (userId) {
    handle = Meteor.subscribe('users.one', userId);
  }
  const user = Meteor.users.findOne({ _id: userId }) || Meteor.user();
  console.log('user: ', user);
  const loading = !Roles.subscription.ready() || !handle.ready();

  return ({
    loading,
    userId,
    user,
  });
},
)(App);
