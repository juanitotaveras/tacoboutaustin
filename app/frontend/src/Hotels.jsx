import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';


export default class Hotels extends Component {
  render() {
    return (
    	<div>
	    	<Container>
	    		<Row>
	      			<h1>Hotels </h1>
	    		</Row>
	    	</Container>
	    	<Container>
	  			<Row>
	  				<Col>
	  					<HotelCard id="1"/>
	  				</Col>
	  				<Col>
	  					<HotelCard id="2"/>
	  				</Col>
	  				<Col>
	  					<HotelCard id="3"/>
	  				</Col>
	  			</Row>
	  		</Container>
	  	</div>
    );
  }
}