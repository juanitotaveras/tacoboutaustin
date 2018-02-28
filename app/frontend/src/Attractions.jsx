import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AttractionCard from './AttractionCard';
/*
const attractions = [
{
  id: "0",
  name: "Zilker Park",
  image: "http://laketravislifestyle.com/wp-content/uploads/2014/05/IMG_3356.jpg",
  activitytype: "Park and recreational area",
  rating: "★★★★☆",
  hours: "5AM-10PM",
  reviews: "Staff is always friendly and a good group of people to work with."
},

{
  id: "1",
  name: "Texas State Capitol",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TexasStateCapitol-2010-01.JPG/1200px-TexasStateCapitol-2010-01.JPG",
  activitytype: "Tour offices and chambers of the Texas Legislature",
  rating: "★★★★☆",
  hours: "7AM-10PM",
  reviews: "Beautiful place to walk around, but sometimes the guards are a bit jumpy."
},

{
  id: "2",
  name: "Lady Bird Lake",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/AustinSkylineLouNeffPoint-Jun2010-a.JPG/1200px-AustinSkylineLouNeffPoint-Jun2010-a.JPG",
  activitytype: "Lake, hiking, running, bat, and fishing",
  rating: "★★★★☆",
  hours: "24/7",
  reviews: "We Austinites are so lucky to have such a big, beautiful lake circled by fantastic walking/biking/running trails."
}];
*/

var attractions = [];

export {attractions};

class Attraction {
  constructor(address, id, image1, name, rating) {
    this.address = address;
    this.id = id;
    this.image = image1;
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
        attractions.push(new Attraction(array["address"], array["id"], array["image1"], array["name"], array["rating"]));
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