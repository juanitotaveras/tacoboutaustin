import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class RestaurantCard extends Component {
  render(props) {
    var r = this.props.restaurant;
    return (
      <div>
        <Card>
          <CardImg top width="100%" height="200em" src={r.image} alt="Le food" />
          <CardBody>
            <CardTitle>{r.name}</CardTitle>
            <CardSubtitle>{r.food}</CardSubtitle>
            <CardText>Rating: {r.rating}/5</CardText>
            <Button outline ><Link to={'/restaurants/' + r.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    restaurant: PropTypes.object
  }
