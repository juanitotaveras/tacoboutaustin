import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class HotelCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="http://texashillcountry.com/wp-content/uploads/2014/02/Four-Season-Hotel-Austin-640x321.jpg" alt="Card image cap" />
          <CardBody>
            <CardTitle>Four Seasons Hotel</CardTitle>
            <CardSubtitle>Downtown Austin</CardSubtitle>
            <CardText>Reviews, and google maps location</CardText>
            <Button outline ><Link to={'/hotels/' + this.props.id}>Check it out!</Link></Button>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    id: PropTypes.string
  }