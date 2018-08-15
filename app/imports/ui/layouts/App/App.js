import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import DeferredComponent from '@ninjapixel/meteor-deferred-component';
import DeferredComponent from '../../components/DeferredComponent/DeferredComponent';
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

// having a key on each route ensures that the DeferredComponent updates between route changes, between deferred components.
const paths = [
  <AppRoute key={1} path="/" exact title="Hello, World!" component={HomeScreen} />,
  <AppRoute key={2} path="/page1" title="Page 1 - Dynamically Loaded 😎" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Page1/Page1.js')} name="Meteor developer" />,
  <AppRoute key={3} path="/page2" title="Page 2 - Dynamically Loaded 🏎️" exact component={DeferredComponent} loadingComponent={<LoadingComponent />} importFunction={() => import('/imports/ui/screens/Page2/Page2.js')} />,
];

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <TitleBarAndNavDrawer>
            <Switch>{[paths]}</Switch>
          </TitleBarAndNavDrawer>
        </div>
      </Router>
    );
  }
}
