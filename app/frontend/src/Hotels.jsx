import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';

var hotels = [];

export class Hotel {
  constructor(address, id, image, name) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    //this.amenities
    // this.reviews
    // this.rating
  }
}

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = hotels;
  }
  componentWillMount() {
    function fillInRestaurants(responseText) {
      let locations = JSON.parse(responseText)["list"];
      for (let location in locations) {
        let array = locations[location];
        hotels.push(new Hotel(array["address"], array["id"], array["image"], array["name"]));
      } 
    }

    const url = "http://localhost/api/hotels";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          // do something with response text
          parseResponse(xmlHttp.responseText);
        
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInRestaurants);
  }

  render() {
    var cards = hotels.map(function(hotel){
            return <Col xs="12" sm="6" md="6" lg="3"><HotelCard hotel={hotel} /></Col>;
          })

    return (
      <div>
        <Container>
              <h1>Hotels </h1>
            <Row>
                {cards}
            </Row>
          </Container>
        </div>
    );
  }
}