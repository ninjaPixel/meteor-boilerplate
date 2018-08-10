import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import DeferredComponent from '@ninjapixel/meteor-deferred-component';



const HomeScreen = props => (
  <div>
    <header>
      <h1>The App</h1>
    </header>
    <p>
      Lorem ipsum dolor amet hell of normcore tousled paleo before they sold out lomo pickled. Pok pok gentrify af
      hot chicken. Tattooed plaid try-hard, +1 banh mi biodiesel blog forage taxidermy food truck bespoke tilde
      gluten-free. Tbh butcher migas edison bulb twee vice fixie scenester kombucha. Franzen neutra selvage pabst
      art party thundercats locavore kinfolk meggings flannel small batch artisan bespoke fashion axe crucifix.
      Kombucha vinyl gastropub man braid glossier live-edge slow-carb portland. Subway tile lumbersexual locavore,
      vape kale chips umami readymade asymmetrical XOXO health goth chambray pug mlkshk listicle austin.
    </p></div>
);


export default class App extends Component {
  render() {

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact render={routeProps => (<HomeScreen {...routeProps} />)} />
            {/*<Route path="/test" exact render={routeProps => (<Test {...routeProps} name="Meteor developer" />)} />*/}
            <Route path="/test" exact render={routeProps => (<DeferredComponent importFunction={() => import('/imports/ui/screens/Test/Test.js')} {...routeProps} name="Meteor developer" />)} />
          </Switch>


        </div>
      </Router>
    );
  }
}
