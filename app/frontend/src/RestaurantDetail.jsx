import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class RestaurantDetail extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="https://static01.nyt.com/images/2017/03/15/dining/15REST-FRANKLIN-slide-HMM7/15REST-FRANKLIN-slide-HMM7-videoSixteenByNineJumbo1600.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Franklin BBQ</CardTitle>
            <CardSubtitle>Texas BBQ</CardSubtitle>
            <CardText>Reviews, and google maps location</CardText>
            <Button>Check it out!</Button>
          </CardBody>
        </Card>
      </div>
  )};
}
