import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavigationBar';
import Splash from './Splash';


class App extends Component {
  render() {
    return (
    	<div>
        	<NavigationBar/>
        	{/*<Splash />*/}
        </div>
    );
  }
}

export default App;
