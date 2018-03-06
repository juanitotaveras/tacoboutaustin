import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AttractionJumbotron from './AttractionJumbotron'
import PropTypes from 'prop-types';
import { attractions, Attraction } from './Attractions'
import { Hotel } from './Hotels'
import { Restaurant } from './Restaurants';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

var nearby_restaurants = [];
var nearby_hotels = [];
var attraction_details = [];

//export {nearby_restaurants};
//export {nearby_hotels};

export default class AttractionsDetails extends Component {
  constructor(props) {
      super(props);
      //this.state = attraction_details;
    }

  componentWillMount() {
      function parseData(responseText) {
          let attraction = JSON.parse(responseText)["attraction"];
          let restaurants = JSON.parse(responseText)["close_by_restaurants"];
          let hotels = JSON.parse(responseText)["close_by_hotels"];

          // console.log("HOtel:" + hotels);

          for (let restaurant in restaurants) {
            nearby_restaurants.push(new Restaurant(
              restaurant["address"],
              restaurant["id"],
              restaurant["image"],
              restaurant["name"],
              restaurant["rating"]));
          } 
          for (let hotel in hotels) {
            nearby_hotels.push(new Hotel(
              hotel["address"],
              hotel["id"],
              hotel["image"],
              hotel["name"],
              hotel["rating"]));
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
  
  render() {
    var cards = nearby_hotels.map(function(hotel){
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
        <Row>
          <h1>Nearby Hotels</h1>
        </Row>
            <Row>
                {cards}
            </Row>
        <Row>
          <h2><Link to='/restaurants'>Restaurants!</Link></h2>
        </Row>
      </Container>
    );
  }

}