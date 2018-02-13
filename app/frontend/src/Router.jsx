import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Restaurants from './Restaurants';
import App from './App';
import Hotels from './Hotels';
import Attractions from './Attractions';
import About from './About';
import Splash from './Splash';

export default class Router extends Component {
  render() {
    return (
      <Switch>
	  	<Route exact path='/' component={Splash}/>
	  {/* both /roster and /roster/:number begin with /roster */}
	  	<Route exact path='/restaurants' component={Restaurants}/>
	  	<Route exact path='/attractions' component={Attractions}/>
	  	<Route exact path='/hotels' component={Hotels}/>
	  	<Route exact path='/about' component={About}/>
	  </Switch>
    );
  }
}


