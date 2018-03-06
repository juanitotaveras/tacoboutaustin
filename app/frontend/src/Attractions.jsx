import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AttractionCard from './AttractionCard';

var attractions = [];

export class Attraction {
  constructor(address, id, image, name, rating) {
    this.address = address;
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
  }
}

export default class Attractions extends Component {
  constructor(props) {
    super(props);
    this.state = attractions;
  }

  componentWillMount() {
    function fillInAttractions(responseText) {
      let locations = JSON.parse(responseText)["list"];
      for (let location in locations) {
        let array = locations[location];
        attractions.push(new Attraction(array["address"], array["id"], array["image"], array["name"], array["rating"]));
      } 
    }

    const url = "http://localhost/api/attractions";

    function request(url, parseResponse) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) 
          parseResponse(xmlHttp.responseText);
      }
      xmlHttp.open("GET", url, false) // true for asynchronous
      xmlHttp.send(null);
    }

    request(url, fillInAttractions);
  }

  render() {
    var cards = attractions.map(function(attraction){
            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
          })

    return (
      <div>
        <Container>
          <Row>
              <h1>Attractions </h1>
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