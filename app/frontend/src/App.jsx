import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './NavigationBar';
import Splash from './Splash';
import About from './About';
import { Route } from 'react-router-dom';
import Router from './Router';
import { Container, Row, Col } from 'reactstrap'


class App extends Component {
  render() {
    return (
    	<div>
    	<Container>
    	  <Row>
    	    <Col>
        	  <NavigationBar/>
        	</Col>
          </Row>
    	</Container>
        	<Router />
        </div>
    );
  }
}

export default App;
