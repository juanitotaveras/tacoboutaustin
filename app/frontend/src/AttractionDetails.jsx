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
import { api_url } from './config';

var nearby_restaurants = [];
var nearby_hotels = [];
var a_details = {};


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

          a_details = attraction;
      }
    
      const url = api_url + "/attractions/" + this.props.match.params.att_id;

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

  buildMapSrc() {
    var address = a_details.address[0] + " " + a_details.address[1];
    var s = "https://www.google.com/maps/embed/v1/place?q=" + encodeURI(address) + "&key=AIzaSyD7QCCYdGEGvI3J74sDAwqJbaWieKC6V2k";
    return s;
  }
  
  render() {
    var nearby_restaurant_cards = nearby_restaurants.map(function(restaurant){
                return <Col xs="12" sm="6" md="6" lg="3"><RestaurantCard restaurant={restaurant} /></Col>;
              })
    var nearby_hotel_cards = nearby_hotels.map(function(hotel){
                return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
              })

    var map = this.buildMapSrc();

    return (
      <Container>
        <Row>
          <Col sm="12">
          <h1>Attraction Details</h1>
          </Col>
          <Col>
            <AttractionJumbotron
            name={a_details.name}
            activitytype="poop activitytype"
            images={a_details.images}
            map_src={map}
            hours="No hours"
            rating={a_details.rating}
            reviews={a_details.reviews}
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