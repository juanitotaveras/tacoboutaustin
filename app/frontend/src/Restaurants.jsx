import React, { Component } from 'react';
import './App.css';
import RestaurantCard from './RestaurantCard'
import { Container, Row, Col } from 'reactstrap';

var restaurants = [];

export class Restaurant {
  constructor(address, id, image, name, rating) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
  }
}

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = restaurants;
  }

  componentWillMount() {
    function fillInRestaurants(responseText) {
      let restaurants_parsed = JSON.parse(responseText)["list"];
      for (let r of restaurants_parsed) {
        restaurants.push(new Restaurant(r["address"], r["id"], r["image"], r["name"], r["rating"]));
      }
    }
    
    const url = "http://localhost/api/restaurants";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          parseResponse(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInRestaurants);
  }

  componentWillUnmount() {
    restaurants = [];
  }

  render() {
    var cards = restaurants.map(function(restaurant){
            return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
          })

    return (
    	<div>
    		<Container>
	      			<h1>Restaurants </h1>
      			<Row>
                {cards}
      			</Row>
      		</Container>
      	</div>
    );
  }
}