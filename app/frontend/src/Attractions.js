import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AttractionCard from './AttractionCard';

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

export {attractions};


export default class Attractions extends Component {
  constructor(props) {
    super(props);
    this.state = attractions;
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
              <h1>Attractions </h1>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <AttractionCard attraction={this.state[0]}/>
              </Col>
              <Col>
                <AttractionCard attraction={this.state[1]}/>
              </Col>
              <Col>
                <AttractionCard attraction={this.state[2]}/>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}