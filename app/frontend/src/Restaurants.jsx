import React, { Component } from 'react';
import './App.css';
import RestaurantCard from './RestaurantCard'
import { Container, Row, Col } from 'reactstrap';

// const restaurants = [
// {
//   id: "0",
//   name: "Franklin BBQ",
//   image: "https://static01.nyt.com/images/2017/03/15/dining/15REST-FRANKLIN-slide-HMM7/15REST-FRANKLIN-slide-HMM7-videoSixteenByNineJumbo1600.jpg",
//   food: "Barbecue Restaurant",
//   rating: "★★★★★",
//   hours: "11AM-3PM",
//   reviews: "While on every barbecue list, this famed spot deserves its reputation for some of the best barbecue in the country."
// },

// {
//   id:"1",
//   name:"The Oasis",
//   image:"https://laketravis.com/listify/wp-content/uploads/2016/10/oasis-10.jpg",
//   food:"Tex-Mex Restaurant",
//   rating:"★★★★☆",
//   hours: "11:30AM-8PM",
//   reviews: "Good Place to Eat with wonderful view, but a bit pricy and hard to get a table."
// },
// {
//   id:"2",
//   name:"Torchy's Tacos",
//   image:"https://www.papercitymag.com/wp-content/uploads/2017/04/56a66a7b2c26c.image_.jpg",
//   food:"Tacos",
//   rating:"★★★☆☆",
//   hours: "7AM-10PM",
//   reviews: "My personal lunch favorites are 'the democrat' and \"the brushfire\", but don't let that keep you from trying them all!"
// }];

var restaurants = []

export{restaurants};

export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    // this.state = restaurants;
  }

  componentWillMount()
  {
      //HTTP request
      var json;
      const url = "http://localhost/api/restaurants";
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)  {
          json = JSON.parse(xmlHttp.responseText);
          json = json['list'];
        }
    }

    xmlHttp.open("GET", url, false) // true for asynchronous
    xmlHttp.send(null);

    //Set restaurants
    // this.setState(json);
    restaurants = json;
  }

  render() {
    var cards = restaurants.map(function(restaurant){
            return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
          })

    return (
    	<div>
    		<Container>
	    		<Row>
	      			<h1>Restaurants </h1>
	      		</Row>
      		</Container>
      		<Container>
      			<Row>
                {cards}
      			</Row>
      		</Container>
      	</div>
    );
  }
}