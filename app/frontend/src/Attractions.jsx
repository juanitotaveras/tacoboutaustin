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
      let attractions_parsed = JSON.parse(responseText)["list"];
      for (let a of attractions_parsed) {
        attractions.push(new Attraction(a["address"], a["id"], a["image"], a["name"], a["rating"]));
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

  componentWillUnmount() {
    attractions = [];
  }

  render() {
    var cards = attractions.map(function(attraction){
            return <Col xs="12" sm="6" md="6" lg="3"><AttractionCard attraction={attraction} /></Col>;
          })

    return (
      <div>
        <Container>
              <h1>Attractions </h1>
            <Row>
                {cards}
            </Row>
          </Container>
        </div>
    );
  }
}