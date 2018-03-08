import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AttractionJumbotron from './AttractionJumbotron'
import PropTypes from 'prop-types';
import { attractions, Attraction } from './Attractions'
import { Hotel } from './Hotels'
import { Restaurant } from './Restaurants';
import RestaurantCard from './RestaurantCard';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

var nearby_restaurants = [];
var nearby_hotels = [];
var attraction_details = [];


export default class AttractionsDetails extends Component {
  constructor(props) {
      super(props);
    }

  componentWillMount() {
      function parseData(responseText) {
          let attraction = JSON.parse(responseText)["attraction"];
          let restaurants = JSON.parse(responseText)["close_by_restaurants"];
          let hotels = JSON.parse(responseText)["close_by_hotels"];

          for (let r of restaurants) {
            nearby_restaurants.push(r);
          }

          for(let h of hotels) {
            nearby_hotels.push(h);
          }

          attraction_details = attraction;
      }
    
      const url = "http://localhost/api/attractions/" + this.props.match.params.att_id;

      function request(url, parseResponse) {
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
                parseResponse(xmlHttp.responseText);
          }
          xmlHttp.open("GET", url, false) // true for asynchronous
          xmlHttp.send(null);
      }

      request(url, parseData);
  }

  componentWillUnmount() {
      nearby_restaurants = [];
      nearby_hotels = [];
  }
  
  render() {
    var nearby_restaurant_cards = nearby_restaurants.map(function(restaurant){
                return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
              })
    var nearby_hotel_cards = nearby_hotels.map(function(hotel){
                return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
              })

    return (
      <Container>
        <Row>
          <Col sm="12">
          <h1>Attractions Details</h1>
          </Col>
          <Col>
            <AttractionJumbotron
            name={attraction_details.name}
            activitytype="poop activitytype"
            image={attraction_details.images[2]}
            map="http://texspine.com/wp-content/uploads/2012/01/map.jpg"
            hours="No hours"
            rating={attraction_details.rating}
            />
          </Col>
        </Row>
          <h1>Nearby things!</h1>
          <h2> Restaurants </h2>
        <Row>
          {nearby_restaurant_cards}
        </Row>
          <h2> Hotels </h2>
        <Row>
          {nearby_hotel_cards}
        </Row>
      </Container>
    );
  }

}