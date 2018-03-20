import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';
import { api_url } from './config';

var hotels = [];

export class Hotel {
  constructor(address, id, image, name, rating) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    //this.amenities
    // this.reviews
    this.rating = rating;
  }
}

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = hotels;
  }

  componentWillMount() {
    function fillInHotels(responseText) {
      let hotels_parsed = JSON.parse(responseText)["list"];
      for (let h of hotels_parsed) {
        hotels.push(new Hotel(h["address"], h["id"], h["image"], h["name"], h["rating"]));
      } 
    }

    const url = api_url + "/hotels";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          parseResponse(xmlHttp.responseText);        
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInHotels);
  }

  componentWillUnmount() {
    hotels = [];
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