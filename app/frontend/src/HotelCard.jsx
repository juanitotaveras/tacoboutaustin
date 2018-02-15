import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class HotelCard extends Component {
  render() {
    var h = this.props.hotel;
    return (
      <div>
        <Card>
          <CardImg top width="100%" height="200em" src={h.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{h.name}</CardTitle>
            <CardSubtitle>{h.address}</CardSubtitle>
            <CardText>{h.rating}</CardText>
            <Button outline ><Link to={'/hotels/' + h.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object
}