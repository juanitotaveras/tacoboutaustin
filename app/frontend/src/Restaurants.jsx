import React, { Component } from 'react';
import './App.css';
import RestaurantCard from './RestaurantCard'
import { Container, Row, Col } from 'reactstrap';

const restaurants = [
{
  id: "0",
  name: "Franklin BBQ",
  image: "https://static01.nyt.com/images/2017/03/15/dining/15REST-FRANKLIN-slide-HMM7/15REST-FRANKLIN-slide-HMM7-videoSixteenByNineJumbo1600.jpg",
  food: "Barbecue Restaurant",
  rating: "★★★★★"
},

{
  id:"1",
  name:"The Oasis",
  image:"https://laketravis.com/listify/wp-content/uploads/2016/10/oasis-10.jpg",
  food:"Tex-Mex Restaurant",
  rating:"★★★★☆"
},
{
  id:"2",
  name:"Torchy's Tacos",
  image:"https://www.papercitymag.com/wp-content/uploads/2017/04/56a66a7b2c26c.image_.jpg",
  food:"Tacos",
  rating:"★★★☆☆"
}];

export{restaurants};

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = restaurants;
  }

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
      					<RestaurantCard restaurant={this.state[0]}/>
      				</Col>
      				<Col>
      					<RestaurantCard restaurant={this.state[1]}/>
      				</Col>
      				<Col>
      					<RestaurantCard restaurant={this.state[2]}/>
      				</Col>
      			</Row>
      		</Container>
      	</div>
    );
  }
}