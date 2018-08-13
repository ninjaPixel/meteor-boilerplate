import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DeferredComponent from '@ninjapixel/meteor-deferred-component';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';

const LoadingComponent = () => (
  <div className="loading">
    <h3>Fetching component...</h3>
  </div>
);

const HomeScreen = props => (
  <div>
    <header>
      <h1>The App</h1>
    </header>
    <p>
      Some text...
    </p></div>
);


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TitleBarAndNavDrawer>
            <Switch>
              <Route path="/" exact render={routeProps => (<HomeScreen {...routeProps} />)} />
              <Route path="/test" exact render={routeProps => (<DeferredComponent loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Test/Test.js')} {...routeProps} name="Meteor developer" />)} />
            </Switch>
          </TitleBarAndNavDrawer>
        </div>
      </Router>
    );
  }
}
