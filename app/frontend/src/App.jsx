import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavigationBar';
import Splash from './Splash';
import About from './About';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
    	<div>
        	<NavigationBar/>
        	<Route path="/about" component={About} />
        	{/*<Splash />*/}
        </div>
    );
  }
}

export default App;
