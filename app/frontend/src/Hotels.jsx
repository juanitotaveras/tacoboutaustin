import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelDetail from './HotelDetail';


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
	  					<HotelDetail />
	  				</Col>
	  				<Col>
	  					<HotelDetail />
	  				</Col>
	  				<Col>
	  					<HotelDetail />
	  				</Col>
	  			</Row>
	  		</Container>
	  	</div>
    );
  }
}