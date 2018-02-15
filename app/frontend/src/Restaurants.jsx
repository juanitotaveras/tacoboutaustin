import React, { Component } from 'react';
import './App.css';
import RestaurantCard from './RestaurantCard'
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
      		<Container>
      			<Row>
      				<Col>
      					<RestaurantCard
                id="1"
                name="Franklin BBQ"
                image="https://static01.nyt.com/images/2017/03/15/dining/15REST-FRANKLIN-slide-HMM7/15REST-FRANKLIN-slide-HMM7-videoSixteenByNineJumbo1600.jpg"
                food="Barbecue Restauant"
                rating="★★★★★"
                />
      				</Col>
      				<Col>
      					<RestaurantCard
                id="2"
                name="The Oasis"
                image="https://laketravis.com/listify/wp-content/uploads/2016/10/oasis-10.jpg"
                food="Tex-Mex Restaurant"
                rating="★★★★☆"
                />
      				</Col>
      				<Col>
      					<RestaurantCard
                id="3"
                name="Torchy's Tacos"
                image="https://www.papercitymag.com/wp-content/uploads/2017/04/56a66a7b2c26c.image_.jpg"
                food="Tacos"
                rating="★★★☆☆"
                />
      				</Col>
      			</Row>
      		</Container>
      	</div>
    );
  }
}