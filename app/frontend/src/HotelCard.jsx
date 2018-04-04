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
            <CardSubtitle></CardSubtitle>     
            <CardText><span>Rating: {h.rating}/5</span> <span style={{float: 'right'}}>Zip code: {h.zip_code}</span></CardText>
            <Link to={'/hotels/' + h.id}><Button outline >Check it out!</Button></Link>
          </CardBody>
        </Card>
      </div>
  )};
}

HotelCard.propTypes = {
    hotel: PropTypes.object
}