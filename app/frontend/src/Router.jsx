import React, { Component } from 'react';
import './css/App.css';
import { Switch, Route } from 'react-router-dom';
import Restaurants from './Restaurants';
import App from './App';
import Hotels from './Hotels';
import Attractions from './Attractions';
import About from './About';
import Splash from './Splash';
import RestaurantDetails from './RestaurantDetails';
import AttractionDetails from './AttractionDetails';
import HotelDetails from './HotelDetails';
import Search from './Search';
import BadURL from './BadURL';

export default class Router extends Component {
  render() {
    return (
      <Switch>
	  	<Route exact path='/' component={Splash}/>
	  	<Route exact path='/restaurants' component={Restaurants}/>
	  		<Route path='/restaurants/:res_id' component={RestaurantDetails} />
	  	<Route exact path='/attractions' component={Attractions}/>
	  		<Route path='/attractions/:att_id' component={AttractionDetails} />
	  	<Route exact path='/hotels' component={Hotels}/>
	  		<Route path='/hotels/:hot_id' component={HotelDetails} />
	  	<Route exact path='/about' component={About}/>
	  	<Route exact path='/search' component={Search}/>
	  	<Route exact path='*' component={BadURL} />
	  </Switch>
    );
  }
}


