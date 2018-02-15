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
      					<AttractionCard
                id="1"
                name="Zilker Park"
                image="http://laketravislifestyle.com/wp-content/uploads/2014/05/IMG_3356.jpg"
                type="Park and recreational area"
                rating="★★★★☆"
                />
      				</Col>
      				<Col>
      					<AttractionCard
                id="2"
                name="Texas State Capitol"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TexasStateCapitol-2010-01.JPG/1200px-TexasStateCapitol-2010-01.JPG"
                type="Tour offices and chambers of the Texas Legislature and the Office of the Governor"
                rating="★★★★☆"
                />
      				</Col>
      				<Col>
      					<AttractionCard
                id="3"
                name="Lady Bird Lake"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/AustinSkylineLouNeffPoint-Jun2010-a.JPG/1200px-AustinSkylineLouNeffPoint-Jun2010-a.JPG"
                type="Lake, hiking, running, bat, and fishing"
                rating="★★★★☆"
                />
      				</Col>
      			</Row>
      		</Container>
      	</div>
    );
  }
}