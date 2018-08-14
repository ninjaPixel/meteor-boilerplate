import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DeferredComponent from '@ninjapixel/meteor-deferred-component';
import TitleBarAndNavDrawer from '../TitleBarAndNavDrawer/TitleBarAndNavDrawer';
import AppRoute from '../../components/AppRoute/AppRoute';

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
              <AppRoute path="/" exact component={HomeScreen} title="Hello, World!" />
              <AppRoute path="/page1" title="Page 1 - Dynamically Loaded 😎" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Test/Test.js')} name="Meteor developer" />
            </Switch>
          </TitleBarAndNavDrawer>
        </div>
      </Router>
    );
  }
}
