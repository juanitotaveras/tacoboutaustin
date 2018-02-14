import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class HotelDetail extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="http://texashillcountry.com/wp-content/uploads/2014/02/Four-Season-Hotel-Austin-640x321.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Four Seasons Hotel</CardTitle>
            <CardSubtitle>Downtown Austin</CardSubtitle>
            <CardText>Reviews, and google maps location</CardText>
            <Button>Check it out!</Button>
          </CardBody>
        </Card>
      </div>
  )};
}