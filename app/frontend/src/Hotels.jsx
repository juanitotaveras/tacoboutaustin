import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import HotelCard from './HotelCard';

var hotels = [/*
{
  id: "0",
  name: "Omni Austin Hotel Downtown",
  image: "https://www.omnihotels.com/-/media/images/hotels/ausctr/pool/ausctr-omni-austin-hotel-downtown-evening-pool.jpg",
  address: "700 San Jacinto Blvd, Austin, TX 78701",
  rating: "★★★★★",
  amenities: "Breakfast, pool, room service",
  reviews: "We didn't get to use the rooftop pool, but my Omni status got us free coffee everyday at their little coffee shop."
}*/];

export {hotels};

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
          <Row>
              <h1>Hotels </h1>
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