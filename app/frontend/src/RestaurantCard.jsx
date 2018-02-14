import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class RestaurantCard extends Component {
  render(props) {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{this.props.name}</CardTitle>
            <CardSubtitle>Type of food</CardSubtitle>
            <CardText>Reviews, and google maps location</CardText>
            <Button outline ><Link to={'/restaurants/' + this.props.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

RestaurantCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string
  }
