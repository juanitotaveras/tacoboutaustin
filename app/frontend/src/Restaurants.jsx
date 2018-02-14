import React, { Component } from 'react';
import './App.css';
import RestaurantDetail from './RestaurantDetail'
import { Container, Row, Col } from 'reactstrap';

export default class Restaurants extends Component {
  render() {
    return (
    	<div>
    		<Container>
	    		<Row>
	      			<h1>Restaurants </h1>
	      		</Row>
      		</Container>
      		<RestaurantDetail />
      	</div>
    );
  }
}