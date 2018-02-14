import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class AttractionDetail extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="http://www.austintexas.gov/sites/default/files/images/Parks/Parks/mtbonnell__1_.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Mount Bonnell</CardTitle>
            <CardSubtitle>Views of rich people</CardSubtitle>
            <CardText>Reviews, and google maps location</CardText>
            <Button>Check it out!</Button>
          </CardBody>
        </Card>
      </div>
  )};
}
