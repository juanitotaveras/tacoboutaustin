import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AttractionCard from './AttractionCard';


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
	  					<AttractionCard id="1"/>
	  				</Col>
	  				<Col>
	  					<AttractionCard id="2"/>
	  				</Col>
	  				<Col>
	  					<AttractionCard id="3"/>
	  				</Col>
	  			</Row>
	  		</Container>
  		</div>
    );
  }
}