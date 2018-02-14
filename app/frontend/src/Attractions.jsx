import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AttractionDetail from './AttractionDetail';


export default class Attractions extends Component {
  render() {
    return (
    	<div>
	    	<Container>
	    		<Row>
	      			<h1>Attractions </h1>
	      		</Row>
	      	</Container>
	  		<Container>
	  			<Row>
	  				<Col>
	  					<AttractionDetail />
	  				</Col>
	  				<Col>
	  					<AttractionDetail />
	  				</Col>
	  				<Col>
	  					<AttractionDetail />
	  				</Col>
	  			</Row>
	  		</Container>
  		</div>
    );
  }
}