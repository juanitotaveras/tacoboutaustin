import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class RestaurantCard extends Component {
  render(props) {
    var r = this.props.restaurant;
    return (
      <div>
        <Card>
          <CardImg top width="100%" height="200em" src={r.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{r.name}</CardTitle>
            <CardSubtitle>{r.food}</CardSubtitle>
            <CardText>{r.rating}</CardText>
            <Button outline ><Link to={'/restaurants/' + r.id}>
            Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.object
  }
